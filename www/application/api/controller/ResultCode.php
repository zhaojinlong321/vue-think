<?php
namespace app\api\controller;



class ResultCode {
	static public $LOGIN_SUCCESS = 2000;      //  登录成功
    static public $USER_DOES_NOT_EXIST = 1001;//  用户名不存在
    static public $PASSWORD_ERROR = 1002;      //  密码错误
}