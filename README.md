# react-router-vkminiapps
Routing library for VK Mini Apps with VKUI

Позволяет быстро и просто организовать маршрутизацию с поддержкой хеш-навигации. Внутри используется redux через context, что гарантирует адекватное обновления состояния и изолированность от других store. Также с помощью History API браузера обрабатывается переход по системной кнопке назад.

Библиотека написана под собственные нужды, используется в нескольких рабочих проектах и никак не связана с разработчиками ВК. 

## Установка

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-router-vkminiapps --save
```

## Использование

Все приложения VK Mini Apps с [VKUI](https://vkcom.github.io/VKUI/#section-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%BE%D0%B2) имеют жесткую структуру экранов в два уровня, где на первом View, а на втором Panel. Отсюда возникает необходимость обрабатывать историю панелей в каждой вивке отдельно, а для этого необходимо заранее знать структуру приложения. 

### Шаг 1
Создаем файл со структурой нашего приложения. Обязательный параметр. По нему алгоритм определяет все маршруты и хеш. По сути это массив views, внутри которого массив panels. Ключи id, panels и их id обязательны. Значения id в массиве должны быть уникальными. 

```js
// structure.js
const structure = [
 {
  id: "main",
  hash: "main",
  panels: [
   {
    id: "home",
    hash: "./home"
   },
   {
    id: "about",
    hash: "./about"
   }
  ]
 },
 {
  id: "settings",
  hash: "settings",
  panels: [
   {
    id: "settings",
    hash: ""
   }
  ]
 }
];

export default structure;
```
Структура в файле должна правильно отображать схему интерфейса приложения VKUI. 

### Шаг 2
Подключаем компонент Router из библиотеки, ну или можно иначе назвать, это не важно, импорт по дефолту. Оборачиваем наше приложение в него. Передаем в качестве props structure наш массив вивок.

```js
import Router from 'react-router-vkminiapps';
import structure from './structure';
import App from './App';

const app = (
 <Router structure={structure}>
  <App/>
 </Router>
);
ReactDOM.render(app, document.getElementById("root"));
```
### Шаг 3
Используем hoc для доступа к управлению и чтению маршрутов. После применения компонент получает пропс router со всеми необходимыми значениями и методами (об этом ниже).

```js
import { withRouter } from 'react-router-vkminiapps';

const MyComponent = (props)=>{
 const setActiveView = (e)=> props.router.toView(e.currentTarget.dataset.id); 
 return(
  <Epic activeStory={props.router.activeView} tabbar={
    <Tabbar>
      <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'main'}
        data-id="main"
        text="Главная"
      >
       <Icon28NewsfeedOutline />
      </TabbarItem>
      <TabbarItem
        onClick={setActiveView}
        selected={props.router.activeView === 'settings'}
        data-id="settings"
        text="Настройки"
      >
       <Icon28ServicesOutline/>
      </TabbarItem>            
    </Tabbar>
  }>
    <View id="main" activePanel={props.router.activePanel}>
      <Panel id="home">
        <PanelHeader>Главная</PanelHeader>
        ...
      </Panel>
      <Panel id="about">
        <PanelHeader left={<PanelHeaderBack onClick={props.router.toBack}/>}>О нас</PanelHeader>
        ...
      </Panel>
    </View>
    <View id="settings" activePanel={props.router.activePanel}>
      <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        ...
      </Panel>
    </View>          
  </Epic>
 );
}

export defalut withRouter(MyComponent);
```
Всё! Мы уже имеем хеш-навигацию с несколькими вивками и панельками в интерфейсе, а также историю перемещения и рабочую кнопку назад с любимого смартфона.

### Объект router
Как видно на третьем шаге, после применения HOC наш компонент обаготился пропсом router, который содержит:

|Prop|Description|
|----|----|
|modal|Для хранения id открытой [модалки](https://vkcom.github.io/VKUI/#section-modals), так как по VKUI структура должна быть задана на старте. По умолчиню null.|
|popout|Для [алертов](https://vkcom.github.io/VKUI/#alert) и тд. По умолчиню null.|
|activeView|ID активной вивки.|
|activePanel|ID активной панели.|
|hash|Текущее значение хеш.|
|----|----|
|toModal|Метод для открытия модалки. В качестве аргумента передаем ID модалки.|
|toPopout|Метод для открытия алерта. В качестве аргумента передаем компонент с алертом.|
|toView|Метод для перехода на нужную View. В качестве аргумента передаем ID вивки (должна быть в structure).|
|toPanel|Метод для перехода на нужную Panel. В качестве аргумента передаем ID панели (должна быть в structure).|
|toHash|Метод для перехода по маршруту на основании известного хеша. В качестве аргумента строка с хешем. Алгоритм соспоставит structure hash и при совпадении активирует нужный маршрут.|
|toBack|Метод возврата на предыдущий маршрут. Алгоритм благодаря хранения истории и structure сам знает куда направить пользователя. Передача аргументов не требуется.|

### Modals and Popouts
В интерфейсах VKUI модалки и алерты являются разными сущностями с различным реализацией. Данная библиотека предлагает все лишь место под хранение во внутреннем сторе, а также добавляет обработку закрытие окна по системной кнопке назад обнуляя свойства modal и popout. Если необходимости в этом нет, можно не использовать.

### Hash
Обратите внимание на указываемый hash в structure. Конечный хеш складывается из значений хеша вивки и её панели. В принцие он может иметь вид практически любой строки. Однако для расширения возможностей были добавлены некоторые особенности:

|Вид|Хеш в адресе|Описание|
|----|----|----|
|/main|main|Абсолютынй путь. Указав такой путь для Panel, мы получим именно такой хеш без слеша после решетки.|
|./home|main/home|Относительный, только для панелей. Так как мы уже используем просто слеш для указания абсолютного пути, то для использовани этого разделителя нужно указать точку.|
|settings|settings|Без разделителей. Просто конкатенация строк.|

### Загрузка приложения по нужному маршруту
Метод toHash позволяет по хеш-ссылке сразу попасть на нужную View и Panel. Хеш должен быть валидный таблице выше. При инициализации библиотека сама попытается прочитать hash из урла и сопоставить с нужным маршрутом для перенаправления.

```js
const hash = window.location.hash.slice(1);
router.toHash(hash);
```

## License

The MIT License.
