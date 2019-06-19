<?php
namespace app\api\service;

use app\api\model\Admin;
use app\lib\exception\TokenException;
use think\Exception;
class AppToken extends Token
{
    public function get($ac, $se)
    {
        $app = Admin::check($ac, $se);
        if(!$app)
        {
            throw new TokenException([
                'msg' => '授权失败',
                'errorCode' => 10004
            ]);
        }
        else{
            $scope = $app->scope;
            $uid = $app->id;
            $values = [
                'scope' => $scope,
                'uid' => $uid
            ];
            $token = $this->saveToCache($values);
            return $token;
        }
    }
    
    private function saveToCache($values){
        $token = self::generateToken();
        $result = cache($token, json_encode($values), 7200);
        if(!$result){
            throw new TokenException([
                'msg' => '服务器缓存异常',
                'errorCode' => 10005
            ]);
        }
        return $token;
    }
}