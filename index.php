<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список дел</title>
    <script src="script/debug.js" defer></script>
    <script src="script/classes/Note.js" defer></script>
    <script src="script/classes/List.js" defer></script>
    <script src="script/classes/User.js" defer></script>
    <script src="script/app.js" defer></script>

</head>

<body>
    <div class="wrapper">
        <header class="header">
            <div class="container">
                <nav class="header__menu">
                    <ul class="menu__list">
                        <li class="menu__item"><a href="#" class="menu__link">Войти</a></li>
                        <li class="menu__item"><a href="#" class="menu__link">Регистрация</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <hr>
        <main class="main">
            <div class="container">
                <div class="main__content">
                    <div class="main__cards-block">
                        <div class="main__cards">
                            <p class="main__card-none">В данный момент записей не обнаруженно</p>
                        </div>
                        <div class="main__cards-bottom">
                            <button class="main__cards-btn btn">+</button>
                        </div>
                    </div>
                    <hr>
                    <div class="main__add-block">
                        <form class="main__add">
                            <div class="add__error"></div>
                            <div class="add-row">
                                <div class="add__lable"><label for="note-title">Заголовок</label></div>
                                <div class="add__field"><input type="text" id="note-title" class="note__title"></div>
                            </div>
                            <div class="add-row">
                                <div class="add__lable"><label for="note-discription">Описание</label></div>
                                <div class="add__field"><textarea id="note-discription" class="note__discription"
                                        cols="22" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="add__btn btn"><button class="note__save">Сохранить</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer"></footer>
    </div>
</body>

</html>