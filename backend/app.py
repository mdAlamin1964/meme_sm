from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, make_response, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "alamin19"
db = SQLAlchemy(app)


HOST = "http://localhost:5000/"
FRONTEND = "http://localhost:5173/meme_sm/"





#formate time
def forame_time_now():
    time_formated =  datetime.now()
    exact_time= time_formated.strftime("%H:%M(24h)")
    exact_months= time_formated.strftime("%B")
    return f"{exact_time}, {exact_months} {time_formated.year}"



# formate commment
def formate_comment(data):
    return {
        'cmt_by' : data.user_name,
        'comment': data.comment,
        'comment_time' : data.comment_time,
    }







#New User registration Table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(50), nullable=False)
    userName = db.Column(db.String(50), unique=True, nullable=False)
    bDay = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    joinDate = db.Column(db.DateTime(), default= datetime.utcnow())
    user_image = db.Column(db.LargeBinary )
    user_image_name = db.Column(db.String(1000))
    def __repr__(self):
        return f"{self.userName}"



# User post 
class User_post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    file_name = db.Column(db.String(100))
    data = db.Column(db.LargeBinary)
    description = db.Column(db.String(500))
    date = db.Column(db.DateTime(), default = datetime.utcnow())
    liked_by = db.Column(db.Integer, default=0) 
    liked_by_users = db.Column(db.String(5000), default="")
    
    def __repr__(self):
        return f"{self.user_name}"




# Post Comments
class Post_comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    user_post_id = db.Column(db.Integer)
    comment = db.Column(db.String(1000))
    comment_time = db.Column(db.String(100), default = forame_time_now())




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




#post formate
def post_formate(i):
    user_image = User.query.filter_by(userName=i.user_name).first()
    all_comments = Post_comments.query.filter_by(user_post_id=i.id).all()
    
    sorted_all_comments = sorted(all_comments, key=lambda x: x.id, reverse=True)

    all_comments_data = []
    for j in sorted_all_comments:
        all_comments_data.append(formate_comment(j))

    return {
        'id': i.id,
        'user_name': i.user_name,
        'file_name':i.file_name,
        'description': i.description,
        'date': i.date,
        'liked_by': i.liked_by,
        'liked_by_users': i.liked_by_users,
        'user_image': user_image.user_image_name,
        'all_comments': all_comments_data,
        
    }


# Profile formate
def profile_formate(i):
    return {
        'userName': i.userName,
        'fullName': i.fullName,
        'bDay': i.bDay,
        'joinDate': i.joinDate,
        'userImageUrl': i.user_image_name,
    }





#validate info
def validate_info(info):
    if len(info) <= 0 or info == ' ' or info.isspace():
        return False
    else:
        return info





#sending error message
def send_massage(message='Something went wrong'):
    
    if ' ' in message:
        message =  message.replace(" ","_")
    
    return redirect(f'{FRONTEND}_massage/{message}')





#current user profile
@app.route('/userData')
def user_data():
    try:
        active_user= User.query.filter_by(userName= logged_user['user']).first()

        #user all post
        user_all_posts = User_post.query.filter_by(user_name = logged_user['user']).all()

        use_posts = []
        for i in user_all_posts:
            use_posts.append(post_formate(i))


        #user all frineds
        user_all_friends = User_friends.query.filter_by(user_name=logged_user['user']).all()

        user_friends = []
        user_friends_user_name = []
        for i in user_all_friends:
            friendList = User.query.filter_by(userName=i.user_friend).first()
            friend_post = User_post.query.filter_by(user_name=friendList.userName).all()
            
            user_friends_user_name.append(i.user_friend)

            friend_all_post = [] 
            for j in friend_post:
                friend_all_post.append(post_formate(j))

            user_friends.append({
                'friend_profile' : profile_formate(friendList),
                'user_friend_post':friend_all_post,
                })
        

        # Suggested friend to show
        suggested_frien_count = 12
        suggested_friends = User.query.order_by(User.userName).all()
        suggested_friends_list = random.sample(suggested_friends, (len(suggested_friends) if suggested_frien_count > len(suggested_friends) else suggested_frien_count))

        suggested_friends_show = []
        for i in suggested_friends_list:
            i = str(i)
            if i != logged_user['user'] and i not in user_friends_user_name:
                suggest_user = User.query.filter_by(userName=i).first()
                suggested_friends_show.append(profile_formate(suggest_user))


        return build_actual_response(jsonify({
            'id' : active_user.id,
            'userName': active_user.userName,
            'fullName': active_user.fullName,
            'bDay': active_user.bDay,
            'joinDate': active_user.joinDate,
            'userImageUrl': active_user.user_image_name,
            'userAllPosts': use_posts,
            'userAllFriends': user_friends,
            'suggested_friends': suggested_friends_show,
        }))
    except Exception as e:
       return render_template('failure.html', cause=e)




#HOME DATA SHOW
@app.route('/homeData')
def home_data():
    try:
        user_friends_list = User_friends.query.filter_by(user_name=logged_user['user']).all()
        
        print('alain')
        #adding friends post
        all_friends_post=[]
        for i in user_friends_list:
            friend_posts = User_post.query.filter_by(user_name=i.user_friend).all()
            friend_profile = User.query.filter_by(userName=i.user_friend).first()

            for j in friend_posts:
                all_friends_post.append({
                    'post':post_formate(j),
                    'profile': profile_formate(friend_profile),
                    })
         
        # adding User own post
        user_own_post = User_post.query.filter_by(user_name=logged_user['user']).all()
        user_profile = User.query.filter_by(userName=logged_user['user']).first()
        for j in user_own_post:
            all_friends_post.append({
                    'post':post_formate(j),
                    'profile': profile_formate(user_profile),
                    })
        
        if user_friends_list:
            return build_actual_response(jsonify(all_friends_post))
        else:
            print('alain')
            random_all_posts = []
            random_posts = User_post.query.order_by(User_post.id).all()
            post_count = 12 if 12 <= len(random_posts) else len(random_posts)
            random_posts = random.sample(random_posts, post_count)
            
            for i in random_posts:
                random_all_posts.append(post_formate(i))
            
            return build_actual_response(jsonify(random_all_posts))
    except Exception as e:
       return render_template('failure.html', cause=e)






#User profile image
@app.route('/profile/<string:user>/<string:url>')
def get_image(user,url):
    try:
        active_user= User.query.filter_by(userName= user, user_image_name = url).first()
        image = active_user.user_image
        return Response(image, mimetype="")
    except:
        return "No image found"


#user post Image show
@app.route('/post/<string:user>/<int:id>/<string:url>')
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
        fullName = validate_info(request.form.get("register-name"))
        userName = validate_info(request.form.get("register-user"))
        bDay = request.form.get("register-bday")
        password = validate_info(request.form.get("register-pass"))
        password_confirm = validate_info(request.form.get("register-pass-confirm"))
        userImage = request.files['user-photo']

        check_user_name = User.query.filter_by(userName=userName).first()  

        if check_user_name:
            return send_massage('user name taken plase try diffrent one')


        if (fullName and userName) and (password == password_confirm):
            new_user = User(fullName=fullName, userName=userName, bDay=bDay, password=password, user_image_name=userImage.filename ,user_image=userImage.read())
            db.session.add(new_user)
            db.session.commit() 
            return send_massage('Account Created Please login')
        else:
            return send_massage('invalid input or confrim password do not match!')

        
    except Exception as e:
        return f'{e}'





supported_file = ["jpg","jpeg","png"]

#uplad files to server
@app.route("/upload", methods=["POST"])
def upload():
    try:
        user_name = logged_user['user']
        description = request.form.get('description')
        file = request.files["file"]
        file_exten = file.filename.split('.')

        #validatin post
        if not file:
            return send_massage('Please add image')

        if file_exten[len(file_exten)-1] not in supported_file:
            return send_massage('file not support!')
        
        new_post = User_post(user_name=user_name, description=description,file_name = file.filename, data = file.read())
        db.session.add(new_post)
        db.session.commit()

        return redirect(FRONTEND+"Profile")
    except Exception as e:
        return send_massage()





# Deleteing user post
@app.route('/delete-post/<int:id>')
def delete_post(id):
    try:
        post_del = User_post.query.filter_by(id=id, user_name=logged_user['user']).first()
        
        #Delete commets as well
        Post_comments.query.filter(Post_comments.user_post_id == id).delete()

        db.session.delete(post_del)
        db.session.commit()
        return redirect(FRONTEND+"Profile")
    except Exception as e:
        return send_massage()







# Adding new frineds
@app.route('/add-friend/<string:friend>')
def add_friends(friend):
    try:
        add_new_friend = User_friends(user_name=logged_user['user'], user_friend=friend)

        db.session.add(add_new_friend)
        db.session.commit()
        return redirect(FRONTEND+"Profile")
    except Exception as e:
        return send_massage()



#removing friend
@app.route('/remove-friend/<string:user>')
def remove_friends(user):
    try:
        remove_friend = User_friends.query.filter_by(user_name=logged_user['user'], user_friend = user).first()

        db.session.delete(remove_friend)
        db.session.commit()

        return redirect(FRONTEND+"Profile")
    except Exception as e:
        return send_massage()






#Update user Data
@app.route('/update-userData', methods=['POST', 'GET'])
def update_userData():
    try:
        new_name = request.form.get('update-name')
        new_bday = request.form.get('update-bday')
        new_image = request.files['update-photo']
        
        user = User.query.filter_by(userName=logged_user['user']).first()

        if validate_info(new_name):
            user.fullName= new_name
        if validate_info(new_bday):
            user.bDay = new_bday
        if new_image:
            user.user_image = new_image.read()
            user.user_image_name = new_image.filename

        db.session.commit()
        return redirect(FRONTEND+"Profile")

    except Exception as e:
        return send_massage(e)






#Loggin a user
@app.route('/login', methods=["POST"])
def login():
    try:
        current_user = User.query.filter_by(userName = request.form['user']).first()
        if current_user.password == request.form['password']:
            session["userName"] = request.form['user']
            logged_user['user'] = session["userName"]
            return redirect(FRONTEND)
        else:
            return send_massage('Incorrect Password!')
    except Exception as e:
        return send_massage("Loggin failed! no Data matched")






# Log out
@app.route('/logout')
def logout():
    session.clear()
    logged_user['user'] = None
    return redirect(FRONTEND)











#Liked by feature
@app.route('/like/<int:id>')
def liked_post(id):
    try:
        post = User_post.query.filter_by(id=id).first()
        likes_split = post.liked_by_users.split(',')

        #removing emply list item
        all_likes = list(filter(None, likes_split))
        if str(logged_user['user']) in all_likes:
            post.liked_by -= 1
            all_likes.remove(logged_user['user'])
        else:
            post.liked_by += 1
            all_likes.append(logged_user['user'])
            
        post.liked_by_users = ",".join(all_likes)
        db.session.commit()
        return build_actual_response(jsonify({
            'total_likes': len(all_likes),
            'liked_by' : all_likes,
        }))
    
    except Exception as e:
        return send_massage()



#liked remove by feature
@app.route('/like-remove')
def like_remove_post():
    try:
        post = User_post.query.order_by(User_post.id).all()
        for i in post:
            i.liked_by_users = ""

        db.session.commit()
        print(post)
        return "Yes"
    
    except Exception as e:
        return send_massage()







#comment sactions
@app.route('/post-comment/<cmt_by>/<int:post_id>', methods=['POST', 'GET'])
def post_comment(cmt_by, post_id):
    try:
        
        if request.method == 'POST' :
            comment = validate_info(request.form.get('user_comment'))
            if comment:
                new_cmt = Post_comments(user_name=cmt_by, user_post_id = post_id, comment = comment)
                db.session.add(new_cmt)
                db.session.commit()
                return redirect(FRONTEND)
            


        post_all_comt = Post_comments.query.filter_by(user_post_id = post_id).all()
        all_comnts = []
        for i in post_all_comt:
            all_comnts.append(formate_comment(i))

        return build_actual_response(jsonify(all_comnts))
        
    except:
        send_massage()





#comment submit
@app.route('/comment/<cmt_by>/<int:post_id>/<string:comment>')
def commnet_user(cmt_by, post_id, comment):
    try:
        if validate_info(comment):
            new_comment = Post_comments(user_name=cmt_by, user_post_id=post_id, comment = comment)
            db.session.add(new_comment)
            db.session.commit()

            post_all_comnt = Post_comments.query.filter_by(user_post_id = post_id).all()
            all_comments = []
            for i in post_all_comnt:
                all_comments.append(formate_comment(i))
            return build_actual_response(jsonify(all_comments))
    except:
        return send_massage()








if __name__ == "__main__":
    app.run(debug=True)
