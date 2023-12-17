# react-webinar-3
Решение от 14.12.2023

Задача 1 ✅
  Добавить фильтр товаров по категории. Список категорий берется из апи.
  Отображается в выпадающем списке. Учитывается иерархия категорий простым добавлением дефиса.
  Но вложенность должна быть корректной. Выбрать можно любую одну категорию. 
  При выборе категории поле поиска и сортировка не сбрасывается, а номер страницы сбрасывается на первый. 
  Также предусмотрен вариант выбрать “все” категории. Он выбран по умолчанию. 

  Пример запроса категорий в /api-examples

  Для фильтра по категории в апи применяется параметр search[category]=id-категории

Задача 2 ✅
  В шапке сайта кнопка “Вход”. Ведет на страницу авторизации /login.
  На странице авторизации форма с двумя полями для логина и пароля.
  Под формой предусмотрен вывод текста ошибок от сервера.

  При успешной авторизации в шапке выводится имя авторизованного пользователя и кнопка “Выход” для сброса авторизации.
  Имя пользователя является ссылкой на страницу профиля /profile. 

  На странице профиля выводятся несколько свойств авторизованного пользователя согласно дизайну. 

  При переходе на страницу профиля нужно проверять доступ.
  Если пользователь не авторизован, то его перенаправлять на страницу авторизации.
  Если пользователь не сбросил  авторизацию, то не требовать снова вводить логин и пароль - авторизовывать автоматически. 

  После авторизации через АПИ выдаётся токен, срок жизни токена неограничен.
  Для выборки профиля пользователя в запросе нужно указывать этот токен в заголовке X-Token.
  По идеи именно токен нужно запомнить и с его помощью автоматически авторизовывать пользователя при очередном посещении сайта.

  Примеры запроса в папке /api-example.
  Для авторизации использовать аккаунт test_1 пароль 123456.

*Update от 17.12.2023 
  - Все категории теперь отображаются корректно.
  - При нажатии на кнопку "Выйти" со страницы профиля, после редиректа, состояние страницы больше не зависает на лоадере.
  - При восстановлении сессии со страницы профиля (F5 на странице профиля) больше не появляется на мгновение форма входа.
  - Воcстановление сессии теперь вызывается в App.
  - Переписан алгоритм сортировки категорий товаров на более универсальный (сортировка происходит рекурсивно).
  - Для списка категорий сделан свой модуль состояния.