const btn = document.getElementsByClassName("btn")[0],
    modalMenu = document.getElementsByClassName("modal-menu")[0],
    menuParts = document.getElementsByClassName('menu-part'),
    listFirstLevel = [...document.getElementsByClassName('menu__list_first-level')],
    // items
    listSecondLevel = [...document.getElementsByClassName('menu__list_second-level')],
    listThirdLevel = [...document.getElementsByClassName('menu__list_third-level')];


// Устанавливает изначальный вид модального окна
function putStartConditions() {

    // console.log('list 1 level:', listFirstLevel);
    listFirstLevel.forEach( item => {
        let items = [...item.children];
        items.forEach( i => {
            i.classList.remove('invisible');
        });  
    });

    listSecondLevel.forEach( item => {
        item.classList.add('invisible');
    });
    
    listThirdLevel.forEach( item => {
        item.classList.add('invisible');
    });

    menuParts[menuParts.length-1].classList.remove('invisible');
}

// Закрывает модальное окно
function closeModalMenu() {
    modalMenu.classList.add('invisible');
    btn.classList.remove('invisible');
    putStartConditions();
}

// Скрывает невыбранных соседей 
function closeSublings(listItem) {
    // получаем список-родитель: 
    const ul = listItem.closest('ul');
    // получаем всех детей
    const allChildren = [...ul.children];

    allChildren.forEach( li => {
        if (li !== listItem) {
            li.classList.add('invisible');
        }
    });
    // закрываем нижнюю часть меню
    menuParts[menuParts.length-1].classList.add('invisible');
}

// Раскрывает меню вглубь 
function showMenuItemContent(listItem) {
    // выбираем ближайший список
    const nextListDeeper = listItem.getElementsByTagName('ul')[0];
    nextListDeeper.classList.remove('invisible');
    closeSublings(listItem);   
}




// Навешиваем слушателя на кнопку
btn.addEventListener("click", (event) => {
    putStartConditions();
    const target = event.target;
    target.classList.add('invisible');
    modalMenu.classList.remove('invisible');
}); 

// Навешиваем слушателя на все модальное окно
modalMenu.addEventListener("click", (e) => {
    const target = e.target;
    let closestListItem = target.closest('li');
    const closestLink = target.closest('a');
    
    if (closestListItem.contains(closestLink)) {
        console.log('Произошел переход по ссылке.');
        closeModalMenu();
    } else {
        console.log('Выполнение скрипта по раскрыванию/скрыванию дочерних списков');
        showMenuItemContent(closestListItem);    
    }
})