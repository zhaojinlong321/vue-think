<?php
namespace app\api\validate;

use app\lib\exception\ParameterException;
use think\facade\Request;
use think\Validate;


class BaseValidate extends Validate
{
	public function goCheck(){
		$request = Request::instance();
        $params = $request->param();
        $params['token'] = $request->header('X-Token');
        if (!$this->check($params)) {
            $exception = new ParameterException(
                [
                    'msg' => is_array($this->error) ? implode(
                        ';', $this->error) : $this->error,
                ]);
            throw $exception;
        }
        return true;
	}
}