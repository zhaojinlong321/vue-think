<?php
namespace app\api\controller;

use think\Controller;
use app\api\validate\AppTokenGet;
use app\api\service\AppToken;
use app\api\service\Token as TokenService;
use app\lib\exception\ParameterException;


class Token
{
	public function getAppToken($ac='', $se=''){
		(new appTokenGet)->goCheck();
		$app=new AppToken();
		$token=$app->get($ac, $se);
		return [
			'code'=>20000,
			'token'=>$token
		];
	}
	public function verifyToken($token='')
    {
        if(!$token){
            throw new ParameterException([
                'token不允许为空'
            ]);
        }
        $valid = TokenService::verifyToken($token);
        return [
            'isValid' => $valid
        ];
    }
}






