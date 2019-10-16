var a = '';

function registration(){
	$('.result').html('');
	var login = $('input[name="Login"]').val();
	var email = $('input[name="inputEmail"]').val();
	var password = $('input[name="inputPassword"]').val();
	var confirm = $('input[name="confirmPassword"]').val();
	var dataPost = {Login: login, inputEmail: email, inputPassword: password, confirmPassword: confirm};
	console.log(dataPost);
	$.ajax({
	  type: "POST",
	  url: "../controller.php?id=reg",
	  dataType: "json",
	  data: dataPost,
	  success: function(data){
	    console.log(data);
	    if(data['error'] == 'this user register'){
	    	$('.result').html('<span style="color: red;">Такой пользователь уже существует</span>');
	    } else if(data['error'] == 'passwords do not match'){
	    	$('.result').html('<span style="color: red;">Пароли не совпадают</span>');
	    } else if(data['error'] == 'insert error'){
	    	$('.result').html('<span style="color: green;">Пожалуйста, обновите страницу</span>');
	    } else if(data['error'] == 'not valid login'){
	    	$('.result').html('<span style="color: red;">Логин должен состоять из латинских букв</span>');
	    } else if(data['error'] == 'not valid pass'){
			$('.result').html('<span style="color: red;">Пароль может состоять из латинских букв или цифр</span>');
	    } else if(data['error'] == 'not valid email'){
	    	$('.result').html('<span style="color: red;">Не верно указан email адрес</span>');
	    } else if(data['error'] == 'not all fields'){
	    	$('.result').html('<span style="color: red;">Пожалуйста, заполните все поля</span>');
	    } else {
	    	document.location.href='http://info.sk';
	    }
	  }
	});
}

function login_form(){
	$('.result').html('');
	var login = $('input[name="login"]').val();
	var password = $('input[name="pass"]').val();
	var dataPost = {login: login, pass: password};
	console.log(dataPost);
	$.ajax({
	  type: "POST",
	  url: "../controller.php?id=login",
	  dataType: "json",
	  data: dataPost,
	  success: function(data){
	    if(data['error'] == 'not found user'){
	    	$('.result').html('<span style="color: red; padding-left: 270px;">Не верно введен логин или пароль. Повторите попытку</span>');
	    } else {
	    	document.location.href='http://info.sk/page/main.php';
	    }
	  }
	});
}

function get_statistics(){
	$('.row').html('');
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=statistics',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет новостей</span>');
	    } else {
	    	var i = 1;
	    	for(var index in jsondata){
	    		div += '<div class="panel-group" id="collapse-group">'
			    	div += '<div class="panel panel-default">'
			    		div += '<div class="panel-heading">'
			    			div += '<h4 class="panel-title">'
			    				div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+i+'">'+index+'</a>'
			    			div += '</h4>'
			    		div += '</div>'
			    		div += '<div id="el'+i+'" class="panel-collapse collapse">'
			    			div += '<div class="panel-body">'
			    			div += '<div class="table-responsive">'
										div += '<table class="table table-hover">'
								    		div += '<thead>'
									    		div += '<tr>'
									    			div += '<td align="center">id</td>'
									    			div += '<td align="center">Имя</td>'
									    			div += '<td align="center">Количество голосов</td>'
									    		div += '</tr>'
								    		div += '</thead>'
								    		div += '<tbody>'
			    			for(var key in jsondata[index]){
			    				if(jsondata[index][key]['name'] != null){
				    						div += '<tr>'
												div += '<td align="center">'+jsondata[index][key]['id']+'</td>'
												div += '<td align="center">'+jsondata[index][key]['name']+'</td>'
												div += '<td align="center">'+jsondata[index][key]['description']+'</td>'
											div += '</tr>'	
								}	        
			    			}
			    						div += '</tbody>'
					    			div += '</table>'
					    		div += '</div>'
			    			div += '</div>'
						div += '</div>'
			    	div += '</div>'
			    div += '</div>'
			    i++;
	    	}
    	$('.row').html(div);
    	console.log('stat');
    	console.log(jsondata);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function proverka(input) { 
    var value = input.value; 
    var rep = /[-;"'0-9&!@#$%^&*()+_]/; 
    if (rep.test(value)) { 
        value = value.replace(rep, ''); 
        input.value = value; 
    } 
}

function set_group(){
	var div = '';
	div += '<div class="form-group">'
			div += '<input type="text" class="form-control" name="txt_name" onkeyup="return proverka(this);" onkeypress="return proverka(this);"/>'
	div += '</div>'
	div += '<button type="button" class="btn btn-default" onclick="reg_group();">Создать группу</button>'
	$('.row').html(div);
}

function reg_group(){
	var gr_name = $('input[name=txt_name]').val();
	if((gr_name.length) > 0){
		var dataPost = {name: gr_name};
		console.log(dataPost);
		$.ajax({
			 type: "POST",
			 url: "../controller.php?id=add_group",
			 dataType: "json",
			 data: dataPost,
			 success: function(data){
			   if(data['error'] == 'error insert'){
			    alert('Что то пошло не так, попробуйте еще раз');
			   } else if(data['error'] == 'not found name') {
				alert('Имя группы не введено');
			   } else if(data['error'] == 'not found POST') {
			   	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
			   } else {
			   	//console.log(data);
			    alert('Группа создана! №'+data['ok']);
			   }
			 }
		});
	} else {
		alert('Вы не выбрали дату');
	}
}

function add_news(){
	var news_name = $('input[name=name]').val();
	var news_select = $('#myselect').val();
	var news_deskr = $('textarea[name=description]').val();
	var news_text = $('textarea[name=dtext]').val();
	if(news_text.length > 0 && news_select.length > 0 && news_name.length > 0 && news_deskr.length > 0){
		var dataPost = {name: news_name, description: news_deskr, dtext: news_text, gid: news_select};
		console.log(dataPost);
		$.ajax({
		  type: "POST",
		  url: "../controller.php?id=add_news",
		  dataType: "json",
		  data: dataPost,
		  success: function(data){
		    if(data['error'] == 'not found POST'){
		    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
		    } else if(data['error'] == 'name already exists'){
		    	$('.result').html('<span style="color: red;">Такое имя уже существует</span>');
		    } else if(data['error'] == 'error insert'){
		    	$('.result').html('<span style="color: red;">Пожалуйста, обновите страницу</span>');
		    } else {
		    	//document.location.href='http://info.sk/page/main.php';
		    	console.log(data);
		    	alert('Новость добавлена');
				$("input:reset").click();
		    }
		  }
		});
	} else {
		$('.result').html('<span style="color: red;">Необходимо заполнить все поля</span>');
	}
}

function set_news(){
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=get_group',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет, ни одной группы</span>');
	    } else if(jsondata['error'] == 'not found uid'){
	    	$('.row').html('<span style="color: red;">Что то, пошло не так, пожалуйста перезайдите</span>');
	    } else {
	    	div +='<h2>Добавление новостей</h2>'
	    div += '<div class="result"></div>'
	    div += '<form class="form-horizontal">'
	        div += '<div class="form-group">'
		        div += '<label class="control-label col-xs-3" for="group">Группа:</label>'
		        div += '<div class="col-xs-9">'
			        div += '<select class="form-control" id="myselect">'
			        	for(var index in jsondata){
			        		div += '<option '+'value='+jsondata[index]['id']+'>'+jsondata[index]['name']+'</option>'
			        	}
			       	div += '</select>'
			    div += '</div>'
	       	div += '</div>'
	    	div += '<div class="form-group">'
		    	div += '<label class="control-label col-xs-3" for="name">Имя:</label>'
		    	div += '<div class="col-xs-9">'
		    		div += '<input type="text" class="form-control" id="name" name="name" placeholder="Введите имя новости">'
		    	div += '</div>'
	    	div += '</div>'
        	div += '<div class="form-group">'
        		div += '<label class="control-label col-xs-3" for="description">Описание:</label>'
        		div += '<div class="col-xs-9">'
        			//div += '<input type="text" class="form-control" id="description" name="description" placeholder="Введите описание новости">'
          			div += '<textarea class="form-control" rows="5" id="description" name="description" placeholder="Введите описание новости"></textarea>'
          		div += '</div>'
        	div += '</div>'
	        	div += '<div class="form-group">'
	        	div += '<label class="control-label col-xs-3" for="dtext">Текст:</label>'
	        	div += '<div class="col-xs-9">'
	        		//div += '<input type="text" class="form-control" id="dtext" name="dtext" placeholder="Введите текст новости">'
	        		div += '<textarea class="form-control" rows="15" id="dtext" name="dtext" placeholder="Введите текст новости"></textarea>'
	        	div += '</div>'
        	div += '</div>'
        	div += '<div class="form-group">'
	        	div += '<div class="col-xs-offset-3 col-xs-9">'
		        	div += '<input type="button" class="btn btn-primary" value="Добавить" onclick="add_news();">'
		        	div += '<input type="reset" class="btn btn-default" value="Очистить форму">'
		        div += '</div>'
        	div += '</div>'
        div += '</form>'
    	$('.row').html(div);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function get_news(){
	$('.row').html('');
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=get_news',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет новостей</span>');
	    } else {
	    	var i = 1;
	    	for(var index in jsondata){
	    		div += '<div class="panel-group" id="collapse-group">'
			    	div += '<div class="panel panel-default">'
			    		div += '<div class="panel-heading">'
			    			div += '<h4 class="panel-title">'
			    				div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+i+'">'+index+'</a>'
			    			div += '</h4>'
			    		div += '</div>'
			    		div += '<div id="el'+i+'" class="panel-collapse collapse">'
			    			div += '<div class="panel-body">'
			    			for(var key in jsondata[index]){
			    				if(jsondata[index][key]['name'] != null){
					    			div += '<div class="col-md-4">'
										div += '<h2>'+jsondata[index][key]['name']+'</h2>'
										div += '<p>'+jsondata[index][key]['description']+'</p>'
										div += '<p><a class="btn btn-default" onclick="news_detail('+jsondata[index][key]['id']+');" role="button">View details &raquo;</a></p>'
									div += '</div>'	
								}				        
			    			}
			    			div += '</div>'
						div += '</div>'
			    	div += '</div>'
			    div += '</div>'
			    i++;
	    	}
    	$('.row').html(div);
    	//console.log(jsondata);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function news_detail(data){
	$('.row').html('');
	var dataPost = {id: data}
	$.ajax({
		  type: "POST",
		  url: "../controller.php?id=get_news_id",
		  dataType: "json",
		  data: dataPost,
		  success: function(jsondata){
		  	var div = '';
		    if(jsondata['error'] == 'not found POST'){
		    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
		    } else if(jsondata == ''){
		    	alert('Новость не найдена');
		    } else {
				    div += '<h2>'+jsondata['name']+'</h2>'
				    div += '<p>'+jsondata['dtext']+'</p>'
				    div += '<p><a class="btn btn-primary" href="http://info.sk/page/main.php" role="button">Home &raquo;</a></p>'
				$('.row').html(div);
		    }
		  },
		  error: function(jqxhr, status, errorMsg) {
	  		console.log(jqxhr);
		  }
	});
}

function get_news_admin(){
	$('.row').html('');
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=get_news',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет новостей</span>');
	    } else {
	    	var i = 1;
	    	for(var index in jsondata){
	    		div += '<div class="panel-group" id="collapse-group">'
			    	div += '<div class="panel panel-default">'
			    		div += '<div class="panel-heading">'
			    			div += '<h4 class="panel-title">'
			    				div += '<a data-toggle="collapse" data-parent="#collapse-group" href="#el'+i+'">'+index+'</a>&nbsp;'
			    			    div += '<a onclick="del_group(\''+index+'\')"><span class="glyphicon glyphicon-remove"></span></a>&nbsp;'
			    			    div += '<a onclick="update_group(\''+index+'\')"><span class="glyphicon glyphicon-pencil"></span></a>'
			    			    
			    			div += '</h4>'
			    		div += '</div>'
			    		div += '<div id="el'+i+'" class="panel-collapse collapse">'
			    			div += '<div class="panel-body">'
			    			for(var key in jsondata[index]){
								if(jsondata[index][key]['name'] != null){
									div += '<div class="col-md-4">'
										div += '<h2>'+jsondata[index][key]['name']+'</h2>'
										div += '<p>'+jsondata[index][key]['description']+'</p>'
										div += '<p><a class="btn btn-default" onclick="news_detail('+jsondata[index][key]['id']+');" role="button">View details &raquo;</a>&nbsp;'
										div += '<a class="btn btn-primary" onclick="update_news('+jsondata[index][key]['id']+',\''+index+'\');" role="button"><span class="glyphicon glyphicon-pencil"></span> Edit</a>&nbsp;'
										div += '<a class="btn btn-danger" onclick="del_news('+jsondata[index][key]['id']+');" role="button"><span class="glyphicon glyphicon-remove"></span> Delete</a></p>'
									div += '</div>'	
								}				        
			    			}
			    			div += '</div>'
						div += '</div>'
			    	div += '</div>'
			    div += '</div>'
			    i++;
	    	}
    	$('.row').html(div);
    	//console.log(jsondata);
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function del_group(name){
	var dataPost = {name: name};
	$.ajax({
		  type: "POST",
		  url: "../controller.php?id=del_group",
		  dataType: "json",
		  data: dataPost,
		  success: function(jsondata){
		  	var div = '';
		  	console.log(jsondata);
		    if(jsondata['error'] == 'not found POST'){
		    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
		    } else if(jsondata == ''){
		    	alert('Группа не найдена');
		    } else if(jsondata['error'] == 'not found group') {
		    	alert('Группа не найдена');
		    } else if(jsondata['error'] == 'error delete group') {
				alert('Не удалось удалить группу');
		    } else {
		    	alert('Данный успешно удалены!');
		    	location.href = 'http://info.sk/page/main.php';
		    }
		  },
		  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function update_group(name){
	var result = '';
	result = prompt('Редактирование имени группы', 'Введите имя');
	var dataPost = {name: name, new_name: result};

	$.ajax({
		  type: "POST",
		  url: "../controller.php?id=update_group",
		  dataType: "json",
		  data: dataPost,
		  success: function(jsondata){
		  	var div = '';
		    if(jsondata['error'] == 'not found POST'){
		    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
		    } else if(jsondata == ''){
		    	alert('Новость не найдена');
		    } else if(jsondata['error'] == 'not found group') {
		    	alert('Новость не найдена');
		    } else if(jsondata['error'] == 'error update group') {
		    	alert('Не удалось обновить');
		    } else {
		    	alert('Данный успешно обновлены!');
		    	location.href = 'http://info.sk/page/main.php';
		    }
		  },
		  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function del_news(id){
	var dataPost = {id: id};
	$.ajax({
		  type: "POST",
		  url: "../controller.php?id=del_news",
		  dataType: "json",
		  data: dataPost,
		  success: function(jsondata){
		  	var div = '';
		    if(jsondata['error'] == 'not found POST'){
		    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
		    } else if(jsondata == ''){
		    	alert('Новость не найдена');
		    } else if(jsondata['error'] == 'not found news') {
		    	alert('Новость не найдена');
		    } else if(jsondata['error'] == 'error delete news') {
		    	alert('Не удалось удалить новость');
		    } else {
		    	alert('Данный успешно удалены!');
		    	location.href = 'http://info.sk/page/main.php';
		    }
		  },
		  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function update_news(id,group){
	var mas = '';
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=get_group',
	  success: function(jsondata){
	    //console.log(jsondata);
	    
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет, ни одной группы</span>');
	    } else if(jsondata['error'] == 'not found uid'){
	    	$('.row').html('<span style="color: red;">Что то, пошло не так, пожалуйста перезайдите</span>');
	    } else {
	    	mas = jsondata;
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});

	var dataPost = {id: id};
	$.ajax({
		type: "POST",
		url: "../controller.php?id=get_data_news_id",
		dataType: "json",
		data: dataPost,
		success: function(jsondata){
			var div = '';
			if(jsondata['error'] == 'not found POST'){
			   alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
			} else if(jsondata == ''){
			   alert('Новость не найдена');
			} else {
				console.log(mas);
			div +='<h2>Добавление новостей</h2>'
			    div += '<div class="result"></div>'
			    div += '<form class="form-horizontal">'
			        div += '<div class="form-group">'
				        div += '<label class="control-label col-xs-3" for="group">Группа:</label>'
				        div += '<div class="col-xs-9">'
					        div += '<select class="form-control" id="myselect">'
					        	for(var index in mas){
					        		if(mas[index]['name'] == group){
					        			div += '<option '+'value='+mas[index]['id']+' selected>'+mas[index]['name']+'</option>'
					        		} else {
					        			div += '<option '+'value='+mas[index]['id']+'>'+mas[index]['name']+'</option>'
					        		}
					        	}
					       	div += '</select>'
					    div += '</div>'
			       	div += '</div>'
				div += '<div class="form-group">'
		    	div += '<label class="control-label col-xs-3" for="name">Имя:</label>'
		    	div += '<div class="col-xs-9">'
		    		div += '<input type="text" class="form-control" id="name" name="name" value="'+jsondata['name']+'">'
		    	div += '</div>'
	    	div += '</div>'
        	div += '<div class="form-group">'
        		div += '<label class="control-label col-xs-3" for="description">Описание:</label>'
        		div += '<div class="col-xs-9">'
          			div += '<textarea class="form-control" rows="5" id="description" name="description">'+jsondata['description']+'</textarea>'
          		div += '</div>'
        	div += '</div>'
	        	div += '<div class="form-group">'
	        	div += '<label class="control-label col-xs-3" for="dtext">Текст:</label>'
	        	div += '<div class="col-xs-9">'
	        		div += '<textarea class="form-control" rows="15" id="dtext" name="dtext">'+jsondata['dtext']+'</textarea>'
	        	div += '</div>'
        	div += '</div>'
        	div += '<div class="form-group">'
	        	div += '<div class="col-xs-offset-3 col-xs-9">'
		        	div += '<input type="button" class="btn btn-primary" value="Обновить" onclick="news_update('+id+');">&nbsp;'
		        	div += '<input type="reset" class="btn btn-default" value="Очистить форму">'
		        div += '</div>'
        	div += '</div>'
        div += '</form>'
			}
			$('.row').html(div);
		},
		error: function(jqxhr, status, errorMsg) {
		  console.log(errorMsg);
		}
	});
}

function news_update(id){
	var news_name = $('input[name=name]').val();
	var news_select = $('#myselect').val();
	var news_deskr = $('textarea[name=description]').val();
	var news_text = $('textarea[name=dtext]').val();
	if(news_text.length > 0 && news_select.length > 0 && news_name.length > 0 && news_deskr.length > 0){
		var dataPost = {id: id, name: news_name, description: news_deskr, dtext: news_text, gid: news_select};
		console.log(dataPost);
		$.ajax({
			  type: "POST",
			  url: "../controller.php?id=update_news",
			  dataType: "json",
			  data: dataPost,
			  success: function(jsondata){
			  	var div = '';
			    if(jsondata['error'] == 'not found POST'){
			    	alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
			    } else if(jsondata == ''){
			    	alert('Новость не найдена');
			    } else if(jsondata['error'] == 'not found news') {
			    	alert('Новость не найдена');
			    } else if(jsondata['error'] == 'error update news') {
			    	alert('Не удалось обновить');
			    } else {
			    	alert('Данный успешно обновлены!');
			    	location.href = 'http://info.sk/page/main.php';
			    }
			  },
			  error: function(jqxhr, status, errorMsg) {
		  		console.log(errorMsg);
				}
		});
	} else {
		$('.result').html('<span style="color: red;">Необходимо заполнить все поля</span>');
	}
}

function settings(){
	var mas = '';
	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=get_group',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    //console.log(jsondata);
	    var div = '';
	    if(jsondata == ""){
	    	$('.row').html('<span style="color: red;">Нет, ни одной группы</span>');
	    } else if(jsondata['error'] == 'not found uid'){
	    	$('.row').html('<span style="color: red;">Что то, пошло не так, пожалуйста перезайдите</span>');
	    } else {
	    	mas = jsondata;
	    }
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});

	$.ajax({
	  dataType: 'json',
	  url: '../controller.php?id=settings',
	  success: function(jsondata){
	    //$('.results').html(jsondata);
	    console.log(jsondata);
	    var div = '';
		if(jsondata['error'] == 'not found uid'){
	    	$('.row').html('<span style="color: red;">Что то, пошло не так, пожалуйста перезайдите</span>');
	    } else if (jsondata == '') {
	    	div += '<form role="form">'
  				div += '<div class="form-group">'
  					div += '<label for="text">Группы новостей</label>'
					for(var index in mas){
						div += '<div class="input-group">'
					      div += '<span class="input-group-addon">'
					        div += '<input type="checkbox" value="'+mas[index]['id']+'" name="check" id="ch'+mas[index]['id']+'" onclick="checkbox_checked('+mas[index]['id']+');">'
					      div += '</span>'
					      div += '<input type="text" class="form-control" value="'+mas[index]['name']+'" disabled>'
					    div += '</div>'
					    div += '&nbsp;'
					}
  				div += '</div>'
				div += '<div class="form-group">'
					div += '<label for="text">Порядок вывода</label>'
					div += '<div class="panel-group" id="collapse-group">'
						div += '<ul id="draggablePanelList" class="list-unstyled">'
						for (var key in mas){
						    div += '<li class="panel panel-info" id="'+mas[key]['id']+'" style = "display: none;" name="panel" value="'+mas[key]['id']+'">'
								div += '<div class="panel-body"  onmouseover="drag_panel();">'+mas[key]['name']+'</div>'
							div += '</li>'
						}
						div += '</ul>'
				    div += '</div>'
				div += '</div>'
  				div += '<button type="button" class="btn btn-primary" onclick="set_settings();">Сохранить</button>'
			div += '</form>'
	    } else {
	    	div += '<form role="form">'
  				div += '<div class="form-group">'
  					div += '<label for="text">Группы новостей</label>'
  					/*
  						div += '<div class="checkbox">'
					    	div += '<label>'
					          div += '<input type="checkbox">Финансовая'
					    	div += '</label>'
					  	div += '</div>'
					  	  						div += '<div class="checkbox">'
					    	div += '<label>'
					          div += '<input type="checkbox">Информационная'
					    	div += '</label>'
					  	div += '</div>'
					  	  						div += '<div class="checkbox">'
					    	div += '<label>'
					          div += '<input type="checkbox">Юридическая'
					    	div += '</label>'
					  	div += '</div>'
					*/
					for(var index in mas){
						div += '<div class="input-group">'
					      div += '<span class="input-group-addon">'
					        if(jsondata['sdata'][index] == mas[index]['id']){
					        	div += '<input type="checkbox" value="'+mas[index]['id']+'" name="check" id="ch'+mas[index]['id']+'" onclick="checkbox_checked('+mas[index]['id']+');" checked>'
					        } else {
					        	div += '<input type="checkbox" value="'+mas[index]['id']+'" name="check" id="ch'+mas[index]['id']+'" onclick="checkbox_checked('+mas[index]['id']+');">'
					        }
					      div += '</span>'
					      div += '<input type="text" class="form-control" value="'+mas[index]['name']+'" disabled>'
					    div += '</div>'
					    div += '&nbsp;'
					}
  				div += '</div>'
				div += '<div class="form-group">'
					div += '<label for="text">Порядок вывода</label>'
					div += '<div class="panel-group" id="collapse-group">'
						div += '<ul id="draggablePanelList" class="list-unstyled">'
						if(jsondata['odata'] == ''){
							for (var key in mas){
						    	div += '<li class="panel panel-info" id="'+mas[key]['id']+'" style = "display: none;" name="panel" value="'+mas[key]['id']+'">'
								    div += '<div class="panel-body"  onmouseover="drag_panel();">'+mas[key]['name']+'</div>'
								div += '</li>'
							}
						} else {
							for (var k in jsondata['odata']){
								for(var key in mas){
									if(jsondata['odata'][k] == mas[key]['id']){
										div += '<li class="panel panel-info" id="'+mas[key]['id']+'" style = "display: block;" name="panel" value="'+mas[key]['id']+'">'
										    div += '<div class="panel-body"  onmouseover="drag_panel();">'+mas[key]['name']+'</div>'
										div += '</li>'
										mas.splice(key, 1);
									}
								}
							}
							for(var key in mas){
								div += '<li class="panel panel-info" id="'+mas[key]['id']+'" style = "display: none;" name="panel" value="'+mas[key]['id']+'">'
									div += '<div class="panel-body"  onmouseover="drag_panel();">'+mas[key]['name']+'</div>'
								div += '</li>'
							}
						}
						div += '</ul>'
				    div += '</div>'
				div += '</div>'
  				div += '<button type="button" class="btn btn-primary" onclick="set_settings();">Сохранить</button>'
			div += '</form>'
	    }
	    $('.row').html(div);
	  },
	  error: function(jqxhr, status, errorMsg) {
	  		console.log(errorMsg);
			}
	});
}

function set_settings(){
	var gid = [];
	var gr = document.getElementsByName('check');
	for(var i=0; i<gr.length; i++){
	  if (gr[i].checked) {
	    gid.push(gr[i].value);
	  }
	}
	var poz = [];
	var pr = document.getElementsByName('panel');
	for(var j=0; j<pr.length; j++){
		for(var k=0; k<gid.length;k++){
			if(gid[k] == pr[j].value){
				poz.push(pr[j].value);
			}
		}
	}
	var dataPost = {sdata: gid, odata: poz};
	$.ajax({
		type: "POST",
		url: "../controller.php?id=save_settings",
		dataType: "json",
		data: dataPost,
		success: function(jsondata){
			var div = '';
			console.log(jsondata);
			if(jsondata['error'] == 'not found POST'){
			  alert('Пожалуйста, перезагрузите страницу и попробуйте еще раз');
			} else if(jsondata['error']){
			  alert('Не получилось сохранить настройки');
			} else if(jsondata['ok'] == 'ok update') {
			  alert('Настройки обновлены');
			} else if(jsondata['ok'] == 'ok insert') {
			  alert('Настройки сохранены');
			}
		},
		error: function(jqxhr, status, errorMsg) {
		  	console.log(errorMsg);
		}
	});
}

//Скрывать/показывать блоки, в зависимости от нажатия чекбокса
function checkbox_checked(id) {
    cb = document.getElementById('ch'+id);
    cat = document.getElementById(id);
    if (cb.checked) cat.style.display = "block";
    else cat.style.display = "none";
}
//Перетаскивание блоков, для изменения позиции вывода новостей
function drag_panel(){
    //jQuery(function($) {
        var panelList = $('#draggablePanelList');

        panelList.sortable({
            handle: '.panel-body', 
            update: function() {
                $('.panel', panelList).each(function(index, elem) {
                     var $listItem = $(elem),
                         newIndex = $listItem.index();
                });
            }
        });
    //});
}