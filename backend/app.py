from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, make_response, Response
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "alamin19"
db = SQLAlchemy(app)


HOST = "http://localhost:5000/"
FRONTEND = "http://localhost:5173/meme_sm/"

#New User registration Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(50), nullable=False)
    userName = db.Column(db.String(50), unique=True, nullable=False)
    bDay = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    joinDate = db.Column(db.DateTime(), default=datetime.now().replace(microsecond=0))
    user_image = db.Column(db.LargeBinary)
    user_image_name = db.Column(db.String(1000))
    def __repr__(self):
        return f"{self.userName}"

print(datetime.utcnow().replace(microsecond=0))

# User post
class User_post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    file_name = db.Column(db.String(100))
    data = db.Column(db.LargeBinary)
    description = db.Column(db.String(500))
    date = db.Column(db.DateTime(), default=datetime.now().replace(microsecond=0))
    liked_by=db.Column(db.Integer)




# Post Comments
class Post_comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    user_post_id = db.Column(db.Integer)
    comment = db.Column(db.String(1000))




# User friend list
class User_friends(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    user_friend = db.Column(db.String(50))








# fixing cors
def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response








logged_user = {
    'user' : ''
}





#Data
@app.route('/data')
def data():
    try:
        current_user = User.query.filter_by(userName= logged_user['user']).first()
        return build_actual_response(jsonify({
            'id': current_user.userName,
        }))
    except Exception as e:
       return render_template('failure.html', cause=e)












#current user profile
@app.route('/userData')
def user_data():
    try:
        active_user= User.query.filter_by(userName= logged_user['user']).first()
        user_all_posts = User_post.query.filter_by(user_name = logged_user['user']).all()
        user_all_friends = User_friends.query.filter_by(user_name=logged_user['user']).all()
        
        friends = []
        posts = []
        for i in user_all_posts:
            posts.append({
                'id': i.id,
                'user_name': i.user_name,
                'file_name':i.file_name,
                'description': i.description,
                'date': i.date,
                'liked_by': i.liked_by,
            })

        for i in user_all_friends:
            friendList = User.query.filter_by(userName=i.user_friend).first()
            friends.append({
                'userName': friendList.userName,
                'fullName': friendList.fullName,
                'bDay': friendList.bDay,
                'joinDate': friendList.joinDate,
                'userImageUrl': friendList.user_image_name,
            })

        return build_actual_response(jsonify({
            'id' : active_user.id,
            'userName': active_user.userName,
            'fullName': active_user.fullName,
            'bDay': active_user.bDay,
            'joinDate': active_user.joinDate,
            'userImageUrl': active_user.user_image_name,
            'userAllPosts': posts,
            'userAllFriends': friends,
        }))
    except Exception as e:
       return render_template('failure.html', cause=e)




#HOME DATA SHOW
@app.route('/homeData')
def home_data():
    try:
        user_friends_list = User_friends.query.filter_by(user_name=logged_user['user']).all()
        all_friends_post=[]

        #adding friends post
        for i in user_friends_list:
            friend_posts = User_post.query.filter_by(user_name=i.user_friend).all()

            for j in friend_posts:
                user_image = User.query.filter_by(userName=j.user_name).first()
                all_friends_post.append({
                    'id':j.id,
                    'user_name': j.user_name,
                    'post_image': j.file_name,
                    'description': j.description,
                    'date': j.date,
                    'liked_by':j.liked_by,
                    'user_image': user_image.user_image_name,
                })
         
        # adding User own post
        user_own_post = User_post.query.filter_by(user_name=logged_user['user']).all()
        user_image = User.query.filter_by(userName=logged_user['user']).first()
        for j in user_own_post:
            all_friends_post.append({
                'id':j.id,
                'user_name': j.user_name,
                'post_image': j.file_name,
                'description': j.description,
                'date': j.date,
                'liked_by':j.liked_by,
                'user_image': user_image.user_image_name,
            })


        return build_actual_response(jsonify(all_friends_post))
    except Exception as e:
       return render_template('failure.html', cause=e)






#User profile image
@app.route('/<string:user>/<string:url>')
def get_image(user,url):
    try:
        active_user= User.query.filter_by(userName= user, user_image_name = url).first()
        image = active_user.user_image
        return Response(image, mimetype="")
    except:
        return "No image found"


#user post Image show
@app.route('/<string:user>/<int:id>/<string:url>')
def post_image(user,id, url):
    try:
        c_user_post_image = User_post.query.filter_by(user_name=user, id=id, file_name=url).first()

        image = c_user_post_image.data
        return Response(image, mimetype="")
    except:
        return "No image found!"






#register a user
@app.route("/register", methods=["POST", "GET"])
def register():
    try:
        fullName = request.form.get("register-name")
        userName = request.form.get("register-user")
        bDay = request.form.get("register-bday")
        password = request.form.get("register-pass-confirm")
        userImage = request.files['user-photo']

        new_user = User(fullName=fullName, userName=userName, bDay=bDay, password=password, user_image_name=userImage.filename ,user_image=userImage.read())

        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return render_template("failure.html", cause=e)
    return redirect(FRONTEND)


#uplad files to server
@app.route("/upload", methods=["POST"])
def upload():
    try:
        user_name = logged_user['user']
        description = request.form.get('description')
        file = request.files["file"]
        new_post = User_post(user_name=user_name, description=description,file_name = file.filename, data = file.read())
        db.session.add(new_post)
        db.session.commit()

    except Exception as e:
        return render_template('failure.html', cause=e)
    
    return redirect(FRONTEND)







@app.route('/post-comment', methods=['POST'])
def post_comment():
    return "yes"





#failure attempt
@app.route("/failure")
def failure():
    return render_template("failure.html")






#Loggin a user
@app.route('/login', methods=["POST"])
def login():
    try:
        current_user = User.query.filter_by(userName = request.form['user']).first()
        if current_user.password == request.form['password']:
            session["userName"] = request.form['user']
            logged_user['user'] = session["userName"]
            return redirect('http://localhost:5173/meme_sm/')
        else:
            return render_template('failure.html', cause="incorrect password or user")
    except Exception as e:
        return render_template('failure.html', cause=e)





# # Seting up data for frontend
# @app.route('/data')
# def data():
#     try:





@app.route('/logout')
def logout():
    session.clear()
    logged_user['user'] = None
    return redirect(FRONTEND)




if __name__ == "__main__":
    app.run(debug=True)
