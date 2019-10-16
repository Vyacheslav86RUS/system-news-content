<?php
if(!isset($_SESSION)){
  session_start();
}

if($_SESSION['admin'] != 1){
	$html = '<nav role="navigation" class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="http://info.sk/page/main.php" class="navbar-brand">info.sk</a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div id="navbarCollapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a onclick="get_news();" style="cursor:pointer">Новости</a></li>
        <li><a onclick="settings();" style="cursor:pointer">Найтройки</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="http://info.sk">Выход</a></li>
      </ul>
    </div>
  </div>
</nav>';
} else {
	$html = '<nav role="navigation" class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="http://info.sk/page/main.php" class="navbar-brand">info.sk</a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div id="navbarCollapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a onclick="get_news_admin();" style="cursor:pointer">Новости</a></li>
        <li><a onclick="set_group();" style="cursor:pointer">Создать категорию</a></li>
        <li><a onclick="set_news();" style="cursor:pointer">Добавить новость</a></li>
        <li><a onclick="get_statistics();" style="cursor:pointer">Статистика</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="http://info.sk">Выход</a></li>
      </ul>
    </div>
  </div>
</nav>';
}
echo $html;
?>