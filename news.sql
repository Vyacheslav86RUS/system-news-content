-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Мар 30 2016 г., 03:35
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `news`
--

-- --------------------------------------------------------

--
-- Структура таблицы `news_data`
--

CREATE TABLE IF NOT EXISTS `news_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gid` int(11) NOT NULL COMMENT 'id группы',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dtext` text NOT NULL COMMENT 'Текст новости',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `news_data`
--

INSERT INTO `news_data` (`id`, `gid`, `name`, `description`, `dtext`) VALUES
(1, 2, 'Oracle хочет, чтобы Google заплатила 9,3 миллиарда долларов за использование Java API в Android', 'Ещё в декабре, мы говорили, что с помощью Android N, Google переключиться на версию с открытым кодом Java Development Kit Oracle. Всё потому, что Oracle и Google сражаются друг с другом с 2010 года, когда Oracle обвинил Google в использовании Java API без', 'Ещё в декабре, мы говорили, что с помощью Android N, Google переключиться на версию с открытым кодом Java Development Kit Oracle. Всё потому, что Oracle и Google сражаются друг с другом с 2010 года, когда Oracle обвинил Google в использовании Java API без разрешения, сообщает ITbukva.com. Защита Google утверждала, что интерфейс API не защищён авторскими правами, что привело к победе в суде, которая была частично отменена в 2014 году.Верховный суд США уже вернул дело обратно в суд низшей инстанции, а предварительное слушание назначено на конец следующего месяца. Стало известно, что Oracle требует колоссальные 9,3 млрд. долларов в качестве возмещения ущерба от Google. Эта цифра основана на прибыли, которую Google получила от операционной системы с открытым исходным кодом. Java был разработан компанией Sun Microsystems, которую в 2010 году приобрела корпорация Oracle.При переключении на версию с открытым кодом Java, OpenJDK, со стороны Google нет никаких беспокойств относительно использования Java без разрешения. Однако она не вступит в игру до запуска . До выпуска этой версии Android, Google сказала, что имеет право использовать API по теории добросовестного использования. Последнее позволяет ограниченное копирование материалов защищенных авторским правом.Эксперт Oracle по возмещению ущерба говорит, что Google должна им 475 млн. долларов за убытки плюс 8,83 млрд. долларов, которые Google заработала на Android, продавая мобильные объявления и приложения. Google говорит, что в лучшем случае, она обязана Oracle 100 млн. долларов убытков. 27 апреля обе стороны встретятся на ранее упомянутом досудебном слушании, а начало судебного разбирательства назначено на 9 мая.Смогут ли обе стороны достичь урегулирования? Это то, за чем мы будет наблюдать так, как дата начала судебного разбирательства становиться всё ближе.'),
(2, 2, 'Uber набирает разработчиков через встроенную в приложение игру по кодированию', 'Uber подыскивает потенциальных кандидатов через задачи по взлому, предлагаемые пользователям во время их поездок. Задания появляются в приложении Uber под заголовком, который звучит как «Код на дороге». Несколько пользователей Twitter опубликовали скриншо', 'Uber подыскивает потенциальных кандидатов через задачи по взлому, предлагаемые пользователям во время их поездок. Задания появляются в приложении Uber под заголовком, который звучит как «Код на дороге». Несколько пользователей Twitter опубликовали скриншоты мобильной игры. На прошлой неделе Uber подтвердил порталу Business Insider, что использует подобный способ, чтобы найти новые таланты, сообщает ITbukva.com.Некоторые, кто уже поделились скриншотами онлайн, работают в области технологий, но Uber настаивает на том, что не использует личную информацию пользователей для их поиска.Вместо этого компания говорит, что запускает эту функцию в городах США с высокой концентрацией технологических профессий.«Мы всегда ищем новые способы привлечения потенциальных кандидатов, которые хотят присоединиться к нашей команде и помочь нам решить интересные задачи. Если вы находитесь в месте, где много людей работают в области технологий, вы можете получить доступ к заданию «Код на дороге» в приложении», – сказал представитель в заявлении Business Insider. «Игровой вариант даёт заинтересованным кандидатам возможность показать нам свои навыки весёлым способом, неважно занимаются ли они программированием непрофессионально или работают в качестве разработчика».Игра включает в себя три задания по кодированию, на решение каждого из них у участников есть 60 секунд. Если они достаточно успешно преодолевают их, пользователям будет предложено связаться с Uber непосредственно через приложение. Затем они получают электронное письмо с ссылкой на заявление о приёме на работу.Uber также надеется на участие хакеров в улучшении его продукта. На прошлой неделе, компания объявила, что заплатит до 10,000 долларов любому, кто найдёт ошибки и сможет поставить под угрозу безопасность и пользовательскую конфиденциальность. Это задание начнётся 1 мая.'),
(3, 1, 'Азартный налог: за ставки в Интернете заставят платить', 'Согласно подготовленному Минфином документу, тотализаторы и букмекерские конторы, принимающие ставки в Интернете, заставят платить 2,5-3 млн рублей в месяц. 21 марта его одобрила правительственная комиссия по законопроектной деятельности', 'Согласно подготовленному Минфином документу, тотализаторы и букмекерские конторы, принимающие ставки в Интернете, заставят платить 2,5-3 млн рублей в месяц. 21 марта его одобрила правительственная комиссия по законопроектной деятельностиМинфин России подготовил документ, который объясняет, как тотализаторы и букмекерские конторы могут принимать ставки через Интернет, сообщает РБК со ссылкой на двух участников заседания. Ведомство предлагает нечто вроде вмененного налога в размере от 2,5 до 3 млн рублей в месяц, а заработать система должна с января 2017 года.Фактически речь идет о правоприменении давно принятого закона, и для большинства участников рынка букмекерских услуг это скорее благо, считает президент Национальной ассоциации букмекеров Олег Журавский:Олег Журавскийпрезидент Национальной ассоциации букмекеров«Сейчас есть полный запрет работы в Интернете, кроме условий, предписываемых новым законом, который был принят в конце 2014 года. Все это время — почти полтора года — шли поручения правительства, изменения, различные регламенты, которые позволили букмекерам работать в Интернете. 2,5-3 млн рублей для крупной букмекерской сети, я уверен, это очень посильный налог. Я не могу сказать за все букмекерское сообщество, но за процентов 70 точно могу сказать, что это очень небольшая сумма».');

-- --------------------------------------------------------

--
-- Структура таблицы `news_group`
--

CREATE TABLE IF NOT EXISTS `news_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `news_group`
--

INSERT INTO `news_group` (`id`, `name`) VALUES
(1, 'Финансовая'),
(2, 'Информационные технологии'),
(3, 'Юридическая'),
(4, 'Техническая');

-- --------------------------------------------------------

--
-- Структура таблицы `news_user`
--

CREATE TABLE IF NOT EXISTS `news_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `nid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `priv` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `priv`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@admin.com', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;