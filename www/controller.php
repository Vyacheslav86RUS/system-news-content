<?php
header('Content-Type: text/html; charset=utf-8');
require_once($_SERVER['DOCUMENT_ROOT'].'/include/confing.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/include/class.sql.php');
session_start();
$sql = new db_sql();
switch ($_GET['id']) {
	case 'reg':
		if(isset($_POST)){
			$result = registration($_POST);
			if(isset($result['ok'])){
				$_SESSION['uid'] = intval($result['ok']);
			}
		} else {
			$result = array('error'=>'not found POST');
		}
		//$result = $_POST;
		break;
	case 'add_group':
		if(isset($_POST)){
			$result = add_group($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'get_group':
		if(isset($_SESSION['uid'])){
			$result = get_group();
		} else {
			$result = array('error'=>'not found uid');
		}
		break;
	case 'add_news':
		if(isset($_POST)){
			$result = add_news($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'get_news':
		if($_SESSION['admin'] == 1){
			$result = array_orderby(get_news());
		} else {
			$settings = settings($_SESSION['uid']);
			if(!empty($settings)){
				$result = array_orderby(get_news($settings));
			} else {
				$result = array_orderby(get_news());
			}	
		}
		
		break;
	case 'get_news_id':
		if(isset($_POST)){
			$result = get_news_id($_POST);
			if(isset($_SESSION['uid'])){
				update_read(array('uid'=>$_SESSION['uid'],'id'=>$_POST['id']));
			}
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'get_data_news_id':
		if(isset($_POST)){
			$result = get_data_news_id($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'del_group':
		if(isset($_POST)){
			$result = del_group($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'del_news':
		if(isset($_POST)){
			$result = del_news($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'update_group':
		if(isset($_POST)){
			$result = update_group($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'update_news':
		if(isset($_POST)){
			$result = update_news($_POST);
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'login':
		if(isset($_POST)){
			$result = login($_POST);
			$_SESSION['admin'] = $result['priv'];
			$_SESSION['uid'] = $result['id'];
		} else {
			$result = array('error'=>'not found POST');
		}
		break;
	case 'statistics':
		$result = array_orderby(get_statistics());
		break;
	case 'settings':
		if($_SESSION['uid']){
			$result = settings($_SESSION['uid']);
		} else {
			$result = array('error'=>'not found uid');
		}
		break;
	case 'save_settings':
		if($_POST){
		$result = save_settings(array('uid'=>$_SESSION['uid'],'sdata'=>$_POST['sdata'],'odata'=>$_POST['odata']));
		} else {
			$result = array('error'=>'not found uid');
		}
		break;
	default:
		$result = array('error'=>'Не верный запрос');
		break;
}


function login($data){
	global $sql;
	$ans = array();
	$sql->db_sql_select('id,priv','users','WHERE login=\''.$sql->escape_string($data['login']).'\' && password=\''.$sql->escape_string(md5($data['pass'])).'\'');
	if($sql->d_select_count > 0){
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		$ans = array('id'=>intval($row['id']), 'priv'=>intval($row['priv']));
	} else {
		$ans = array('error'=>'not found user');
	}
	return $ans;
}

function registration($data){
	global $sql;
	$ans = array();
	$login = '';
	$password = '';
	$email = '';
	$flag_pass = false;
	$match = true;
	if(isset($data['Login']) && $data['Login'] != ''){
		$login = $data['Login'];
		if (!preg_match('/^[a-zA-Z]+$/', $login))
		{
		   return array('error'=>'not valid login');
		}
	} else {
		return array('error'=>'not all fields');
	}
	if(isset($data['inputEmail']) && $data['inputEmail'] != ''){
		$email = $data['inputEmail'];
		if (!preg_match("/[-0-9a-z_]+@[-0-9a-z_]+\.[a-z]{2,6}/i", $email))
		{
			  return array('error'=>'not valid email');
		}
	} else {
		return array('error'=>'not all fields');
	}
	if(isset($data['inputPassword']) && isset($data['confirmPassword']) && $data['inputPassword'] != '' && $data['confirmPassword'] != ''){
		if($data['inputPassword'] == $data['confirmPassword']){
			if (!preg_match('/^[0-9a-zA-Z]+$/', $data['inputPassword']))
			{
			   return array('error'=>'not valid pass');
			} else {
				$password = md5($data['inputPassword']);
				$flag_pass = true;
			}
		} else {
			$ans = array('error'=>'passwords do not match');
			$match = false;
		}
	} else {
		return array('error'=>'not all fields');
	}
	if($match){
		$sql->db_sql_select('id','users','WHERE login=\''.$sql->escape_string($login).'\' && password=\''.$sql->escape_string($password).'\'');
		if($sql->d_select_count > 0){
			$flag_pass = false;
			$ans = array('error'=>'this user register');
		}
	}
	if($flag_pass){
		if($sql->db_sql_insert('users(login,password,email)','\''.$sql->escape_string($login).'\',\''.$sql->escape_string($password).'\',\''.$sql->escape_string($email).'\'')){
			$ans = array('ok'=>$sql->last_insert());
		} else {
			$ans = array('error'=>'insert error');
		}
	}
	
	return $ans;
}

function get_statistics(){
	global $sql;
	$ans = array();
	$sql->db_sql_select('news_data.id,
  						news_data.name,
  						news_data.read,
  						news_group.name as gname','news_group',
  						'LEFT JOIN news_data ON news_data.gid = news_group.id
  						ORDER BY news_group.id');
  	if($sql->d_select_count > 0){
  		$news_data = $sql->d_select;
  		while($row = mysql_fetch_array($news_data,MYSQL_ASSOC)){
  			$ans[] = array('id'=>intval($row['id']),
  						   'name'=>$row['name'],
  						   'description'=>count(json_decode($row['read'],true)),
  						   'gname'=>$row['gname']);
  		}
  	}	
	return $ans;
}


function get_news($data=array()){
  global $sql;
  $ans = array();
  if(!empty($data)){
  	$sql->db_sql_select('news_data.id,
  						news_data.name,
  						news_data.description,
  						news_group.name as gname','news_data',
  						'LEFT JOIN news_group ON news_group.id = news_data.gid
  						WHERE news_data.gid IN ('.implode(',', $data['sdata']).') ORDER BY news_data.gid IN ('.implode(',', $data['odata']).')');
  	if($sql->d_select_count > 0){
  		$news_data = $sql->d_select;
  		while($row = mysql_fetch_array($news_data,MYSQL_ASSOC)){
  			$ans[] = array('id'=>intval($row['id']),
  						   'name'=>$row['name'],
  						   'description'=>$row['description'],
  						   'gname'=>$row['gname']);
  		}
  	}
  } else {
  	$sql->db_sql_select('news_data.id,
  						news_data.name,
  						news_data.description,
  						news_group.name as gname','news_group',
  						'LEFT JOIN news_data ON news_data.gid = news_group.id
  						ORDER BY news_group.id');
  	if($sql->d_select_count > 0){
  		$news_data = $sql->d_select;
  		while($row = mysql_fetch_array($news_data,MYSQL_ASSOC)){
  			$ans[] = array('id'=>intval($row['id']),
  						   'name'=>$row['name'],
  						   'description'=>$row['description'],
  						   'gname'=>$row['gname']);
  		}
  	}
  }
  return $ans;
}

function add_group($data){
  global $sql;
  $ans = array();
  if(isset($data['name'])){
    if($sql->db_sql_insert('news_group(name)','\''.$sql->escape_string($data['name']).'\'')){
      $l = $sql->last_insert();
      $ans = array('ok'=>$l);
    } else {
      $ans = array('error'=>'error insert');
    }
  } else {
    $ans = array('error'=>'not found name');
  }
  return $ans;
}

function add_news($data){
  global $sql;
  $gid = 0;
  $name = '';
  $description = '';
  $dtext = '';
  $ans = array();
  if(isset($data['gid'])){
    $gid = intval($data['gid']);
  }
  if(isset($data['name'])){
  	$name = $data['name'];
  }
  if(isset($data['description'])){
  	$description = $data['description'];
  }
  if(isset($data['dtext'])){
  	$dtext = $data['dtext'];
  }
  if(check_news_name($name)){
  	$ans = array('error'=>'name already exists');
  } else {
  	if($sql->db_sql_insert('news_data(gid,name,description,dtext)',$gid.',\''.$sql->escape_string($name).'\',\''.$sql->escape_string($description).'\',\''.$sql->escape_string($dtext).'\'')){
  		$l = $sql->last_insert();
  		$ans = array('ok'=>$l);
  	} else {
  		$ans = array('error'=>'error insert');
  	}
  }
  return $ans;
}

function get_group(){
	global $sql;
	$ans = array();
	$sql->db_sql_select('id,name','news_group');
	if($sql->d_select_count > 0){
		$group = $sql->d_select;
		while($row = mysql_fetch_array($group,MYSQL_ASSOC)){
			$ans[] = array('id'=>intval($row['id']),'name'=>$row['name']);
		}
	}
	return $ans;
}

function check_news_name($name){
	global $sql;
	$flag = false;
	$sql->db_sql_select('id','news_data','WHERE name=\''.$sql->escape_string($name).'\'');
	if($sql->d_select_count > 0){
		$flag = true;
	}
	return $flag;
}

function array_orderby($mas) {
	$result = array();
	$ptm = array();
	$count = count($mas);
	for ($index=0; $index <$count ; $index++) { 
		if(!is_array($result[$mas[$index]['gname']])){
			$result[$mas[$index]['gname']] = array();
		}
		array_push($result[$mas[$index]['gname']], array('id'=>intval($mas[$index]['id']),
			'name'=>$mas[$index]['name'],
  			'description'=>$mas[$index]['description']));
	}
	return $result;
}

function get_news_id($data){
	global $sql;
	$nid = intval($data['id']);
	$ans = array();
	$sql->db_sql_select('name,dtext','news_data','WHERE id='.$nid);
	if($sql->d_select_count > 0){
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		$ans = array('name'=>$row['name'],'dtext'=>$row['dtext']);
	}
	return $ans;
}

function get_data_news_id($data){
	global $sql;
	$nid = intval($data['id']);
	$ans = array();
	$sql->db_sql_select('gid,name,description,dtext','news_data','WHERE id='.$nid);
	if($sql->d_select_count > 0){
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		$ans = array('name'=>$row['name'],'dtext'=>$row['dtext'],'description'=>$row['description'],'gid'=>intval($row['gid']));
	}
	return $ans;
}

function del_group($data){
	global $sql;
	$ans = array();
	$gid = 0;
	$flag = false;
	$sql->db_sql_select('id','news_group','WHERE name=\''.$sql->escape_string($data['name']).'\'');
	if($sql->d_select_count > 0){
		$flag = true;
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		$gid = intval($row['id']);
	}
	if($flag){
		if($sql->db_sql_delete('news_group','WHERE name=\''.$sql->escape_string($data['name']).'\'')){
			$sql->db_sql_delete('news_data','WHERE gid='.$gid);
			$ans = array('ok'=>'ok delete group');
		} else {
			$ans = array('error'=>'error delete group');
		}
	} else {
		$ans = array('error'=>'not found group');
	}
	return $ans;
}

function update_group($data){
	global $sql;
	$ans = array();
	$flag = false;
	$sql->db_sql_select('id','news_group','WHERE name=\''.$sql->escape_string($data['name']).'\'');
	if($sql->d_select_count > 0){
		$flag = true;
	}
	if($flag){
		if($sql->db_sql_update('news_group','name=\''.$sql->escape_string($data['new_name']).'\'','WHERE name=\''.$sql->escape_string($data['name']).'\'')){
			$ans = array('ok'=>'ok delet group');
		} else {
			$ans = array('error'=>'error update group');
		}
	} else {
		$ans = array('error'=>'not found group');
	}

	return $ans;
}

function del_news($data){
	global $sql;
	$ans = array();
	$flag = false;
	$sql->db_sql_select('gid','news_data','WHERE id='.intval($data['id']));
	if($sql->d_select_count > 0){
		$flag = true;
	}
	if($flag){
		if($sql->db_sql_delete('news_data','WHERE id='.intval($data['id']))){
			$ans = array('ok'=>'ok delete news');
		} else {
			$ans = array('error'=>'error delete news');
		}
	} else {
		$ans = array('error'=>'not found news');
	}
	return $ans;
}

function update_news($data){
	global $sql;
	$ans = array();
	$name = '';
	$description = '';
	$dtext = '';
	$gid = 0;
	$flag = false;
	if(isset($data['gid'])){
	   $gid = intval($data['gid']);
	}
	if(isset($data['name'])){
	  $name = $data['name'];
	}
	if(isset($data['description'])){
	  $description = $data['description'];
	}
	if(isset($data['dtext'])){
	  $dtext = $data['dtext'];
	}
	$sql->db_sql_select('gid','news_data','WHERE id='.intval($data['id']));
	if($sql->d_select_count > 0){
		$flag = true;
	}
	if($flag){
		if($sql->db_sql_update('news_data','gid='.$gid.', name=\''.$sql->escape_string($name).'\', description=\''.$sql->escape_string($description).'\', dtext=\''.$sql->escape_string($dtext).'\'','WHERE id='.intval($data['id']))){
			$ans = array('ok'=>'ok update news');
		} else {
			$ans = array('error'=>'error update news');
		}
	} else {
		$ans = array('error'=>'not found news');
	}
	return $ans;
}

function settings($data){
	global $sql;
	$ans = array();
	$uid = intval($data);
	$sql->db_sql_select('sdata,odata','news_user','WHERE uid='.$uid);
	if($sql->d_select_count > 0){
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		$ans = array('sdata'=>json_decode($row['sdata'],true),
					 'odata'=>json_decode($row['odata'],true)
					);
	}
	return $ans;
}

function save_settings($data){
	global $sql;
	$uid = intval($data['uid']);
	$ans = array();
	$sql->db_sql_select('id','news_user','WHERE uid='.$uid);
	if($sql->d_select_count > 0){
		if($sql->db_sql_update('news_user','sdata=\''.json_encode($data['sdata']).'\',odata=\''.json_encode($data['odata']).'\'','WHERE uid='.$uid)){
			$ans = array('ok'=>'ok update');
		} else {
			$ans = array('error'=>'error update');
		}
	} else {
		if($sql->db_sql_insert('news_user(uid,sdata,odata)', $uid.',\''.json_encode($data['sdata']).'\',\''.json_encode($data['odata']).'\'')){
			$ans = array('ok'=>'ok insert');
		} else {
			$ans = array('error'=>'error insert');
		}
	}
	return $ans;
}

function update_read($data){
	global $sql;
	$ans = array();
	$uid = intval($data['uid']);
	$id = intval($data['id']);
	$sql->db_sql_select('cread','news_data','WHERE id='.$id);
	if($sql->d_select_count > 0){
		$row = mysql_fetch_array($sql->d_select,MYSQL_ASSOC);
		if($row['read'] != ''){
			$ans = json_decode($row['read'],true);
			if(!in_array($uid, $ans)){
				array_push($ans, $uid);
			}
		} else {
			array_push($ans, $uid);
		}
		$sql->db_sql_update('news_data','cread=\''.json_encode($ans).'\'','WHERE id='.$id);
	}	
	//return $ans;
}

print json_encode($result);
//print_r($result);
?>