<?php
/**
 * Controller class for json api
 *
 * User: avrilmaomao@qq.com
 * Date: 14/11/3
 * Time: 18:21
 */
class JSON_API_WPFP_Controller {
	public function test(){

		return 'This is a test';
	}
	public function add(){
		global $json_api;
		$post_id = $json_api->query->postid;
		$cookie = $json_api->query->cookie;
		if(empty($post_id)){
			wpfp_die_or_go('missing postid',false);
		}
		if(wpfp_get_option('opt_only_registered') && empty($cookie)){
			wpfp_die_or_go('only registerd user can add favorite');
		}
		if(!empty($cookie)){
			$this->check_and_set_current_user($cookie);
		}
		//添加
		wpfp_add_favorite($post_id);
		wpfp_die_or_go('success',true);

	}

	public function remove(){
		global $json_api;
		$post_id = $json_api->query->postid;
		$cookie = $json_api->query->cookie;
		if(empty($post_id)){
			wpfp_die_or_go('missing postid',false);
		}
		if(!empty($cookie)){
			$this->check_and_set_current_user($cookie);
		}
		//删除
		wpfp_remove_favorite($post_id);
		wpfp_die_or_go('success',true);
	}

	public function lists(){
		global $json_api;
		$cookie = $json_api->query->cookie;
		if(!empty($cookie)){
			$this->check_and_set_current_user($cookie);
		}
		$lists = wpfp_get_users_favorites();
		return array('status'=>'ok','lists'=>$lists);
	}

	private function check_and_set_current_user($cookie){
		$user_id = $this->validate_auth_cookie($cookie);
		if($user_id === false){
			wpfp_die_or_go('invalid cookie',false);
		}else{
			//设置登录用户
			wp_set_current_user($user_id);
		}
	}
	/**
	 * @param $cookie
	 * @param string $schema
	 *
	 * @return int|bool valid:userid invalid:false
	 */
	private function validate_auth_cookie($cookie,$schema = 'logged_in'){
		$isValid = wp_validate_auth_cookie($cookie, $schema);
		return $isValid;
	}
}