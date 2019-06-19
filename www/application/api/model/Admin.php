<?php
namespace app\api\model;

use think\Model;
class Admin extends Model{
    public static function check($ac, $se)
    {
        $app = self::where('account','=',$ac)
            ->where('pwd', '=',$se)
            ->find();
        return $app;

    }
}