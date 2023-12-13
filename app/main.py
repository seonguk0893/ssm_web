from flask import Flask, request, render_template
import pymysql

app = Flask(__name__)

connection = pymysql.connect(host='43.203.1.73',
                             user='root',
                             password='#leeseun80',
                             db='subway',
                             cursorclass=pymysql.cursors.DictCursor)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/cos')
def cos():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`subway` WHERE `업종` = '화장품(미용)' ORDER BY `위치` ASC LIMIT 300 OFFSET 0;")

        data = cursor.fetchall()  # 가져온 데이터를 변수에 저장
    # HTML 템플릿에 데이터 전달
    return render_template('cos.html', data=data)


@app.route('/info')
def info():
    with connection.cursor() as cursor:
        # 쿼리 실행
        cursor.execute(
            "SELECT * FROM `subway`.`subway` WHERE `업종` = '화장품(미용)' ORDER BY `위치` ASC LIMIT 300 OFFSET 0;")

        data = cursor.fetchall()  # 가져온 데이터를 변수에 저장
    # HTML 템플릿에 데이터 전달
    return render_template('info.html', data=data)


if __name__ == '__main__':
    app.run(debug=True)
