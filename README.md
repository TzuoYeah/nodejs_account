# 檔案結構
### ./rotes.js
路由。
### ./db.js
資料庫的操作。  

### ./handlers/api
提供api方法。  

### ./lib/auth.js
處裡身分驗證邏輯。  

# API功能
### /auth/login
可以登入會員資訊，並更具各種狀況作出不同回應：  
1. 密碼錯誤  
{message: 'wrong password.'}
res.send({ message : req.flash('error')} )  

2. 帳號不存在   