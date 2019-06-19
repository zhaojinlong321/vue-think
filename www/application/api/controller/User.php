<?php
namespace app\api\controller;

use app\api\model\Admin as AdminModel;
use app\api\model\Roles as RolesModel;
use app\api\service\Token;
use app\lib\exception\UserException;
use think\Controller;
use think\facade\Request;
class user extends Controller
{
    public function login()
    {
    	$username = $this -> request -> param('username');
        $password = $this -> request -> param('password');
    	$index = new AdminModel();
        $result = $index -> login($username,$password);
        switch ($result){
            case ResultCode::$LOGIN_SUCCESS:
                $res= array(
                	code=>ResultCode::$LOGIN_SUCCESS,
                	token=>'947828637f7355f82aa14f77f99efa5f'
                );
                break;

            case ResultCode::$USER_DOES_NOT_EXIST:
                $res= array(
                	code=>ResultCode::$USER_DOES_NOT_EXIST
                );
                break;

            case ResultCode::$PASSWORD_ERROR:
                $res= array(
                	code=>$PASSWORD_ERROR
                );
                break;
        }
        echo json_encode($res);
    }

    public function info()
    {
        $uid = Token::getCurrentUid();
        $userAdmin = AdminModel::where('id', $uid)
            ->find();
        if(!$userAdmin){
            throw new UserException([
                'msg' => '用户不存在',
                'errorCode' => 60001
            ]);
        }
        $rid=$userAdmin->roles;
        $roles = RolesModel::where('id', $rid)
            ->value('roles');
        if(!$roles){
            throw new UserException([
                'msg' => '管理员权限不存在',
                'errorCode' => 60002
            ]);
        }
        return [
            "code"=>20000,
            "userInfo"=>[
                "roles"=>$roles,
                'name'=>$userAdmin->name,
                'avatar'=>$userAdmin->avatar
            ]
        ];
    }

    public function logout(){
        return [
            "code"=>20000,
            'data'=>"success"
        ];
    }
}
