# react-router-vkminiapps
Routing library for VK Mini Apps with VKUI

Позволяет быстро и просто организовать маршрутизацию приложения на платформе VK Mini Apps с поддержкой хеш-навигации.  

## Установка

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-router-vkminiapps --save
```

## Использование

Все приложения VK Mini Apps с [VKUI](https://vkcom.github.io/VKUI/#section-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%BE%D0%B2) имеют жесткую структуру экранов в два уровня, где на первом View, а на втором Panel. Вместо распространенного подхода с компонентами-обертками, библиотека опирается на заранее указанную структуру приложения. Это позволяет использовать нативные компоненты самой новой версии VK UI, а также иметь любой формат собственных компонентов.

### Шаг 1
Создаем файл со структурой приложения. По ней алгоритм определяет все маршруты и хеш. По сути это массив views, внутри которого массив panels. Ключи id, panels и их id обязательны. Значения id в массиве должны быть уникальными. 

```js
// structure.ts
import { IStructure } from "react-router-vkminiapps";

// для удобства можно использовать enum typescript
export enum ViewTypes {
 MAIN = "MAIN",
 SETTINGS = "SETTINGS"
}

export enum PanelTypes {
 MAIN_HOME = "MAIN_HOME",
 MAIN_ABOUT = "MAIN_ABOUT",
 SETTINGS = "SETTINGS" 
}

const structure: IStructure = [
 {
  id: ViewTypes.MAIN,
  hash: "main",
  panels: [
   {
    id: PanelTypes.MAIN_HOME,
    hash: "/home"
   },
   {
    id: "about",
    hash: "/about"
   }
  ]
 },
 {
  id: ViewTypes.SETTINGS,
  hash: "settings",
  panels: [
   {
    id: PanelTypes.SETTINGS,
    hash: ""
   }
  ]
 }
];

export default structure;
```
Структура в файле должна правильно отображать схему интерфейса приложения VKUI. 

### Шаг 2
Подключаем компонент RouterProvider из библиотеки, оборачиваем в него App, и в качестве props передаем structure.

```js
// index.tsx
import { RouterProvider } from 'react-router-vkminiapps';
import structure from './structure';
import App from './App';

const app = (
 <RouterProvider structure={structure}>
  <App/>
 </RouterProvider>
);
ReactDOM.render(app, document.getElementById("root"));
```
### Шаг 3
Используем hoc или hooks для доступа к управлению и чтению маршрутов.

```js
// App.tsx
import { withRouter, useRouterSelector, useRouterActions } from 'react-router-vkminiapps';
import { ViewTypes, PanelTypes } from './structure';

const App = ({router})=>{
// вместо HOC witRouter для функциональных компонентов можно использовать хуки
// const { activeView, activePanel } = useRouterSelector();
// const { toView, toPanel, toBack } = useRouterActions();

 return(
  <Epic activeStory={router.activeView} tabbar={
    <Tabbar>
      <TabbarItem
        onClick={()=>router.toView(ViewTypes.MAIN)}
        selected={router.activeView === ViewTypes.MAIN}
        text="Главная"
      >
       <Icon28NewsfeedOutline />
      </TabbarItem>
      <TabbarItem
        onClick={()=>router.toView(ViewTypes.SETTINGS)}
        selected={router.activeView === ViewTypes.SETTINGS}
        text="Настройки"
      >
       <Icon28ServicesOutline/>
      </TabbarItem>            
    </Tabbar>
  }>
    <View id={ViewTypes.MAIN} activePanel={router.activePanel}>
      <Panel id={PanelTypes.MAIN_HOME}>
        <PanelHeader>Главная</PanelHeader>
        ...
      </Panel>
      <Panel id={PanelTypes.MAIN_ABOUT}>
        <PanelHeader left={<PanelHeaderBack onClick={router.toBack}/>}>О нас</PanelHeader>
        ...
      </Panel>
    </View>
    <View id={ViewTypes.SETTINGS} activePanel={router.activePanel}>
      <Panel id={PanelTypes.SETTINGS}>
        <PanelHeader>Настройки</PanelHeader>
        ...
      </Panel>
    </View>          
  </Epic>
 );
}

export defalut withRouter(App);
```

### Selectors and actions

Для получения selectors, в которых хранится состояние роутера, есть хук useRouterSelector, а для actions хук useRouterActions. В случае применения HOC withRouter, все они будут доступны в props router.

|Selectors|Description|
|----|----|
|modal|Для хранения id открытой [модалки](https://vkcom.github.io/VKUI/#section-modals), так как по VKUI структура должна быть задана на старте. По умолчиню null.|
|popout|Для [алертов](https://vkcom.github.io/VKUI/#alert) и тд. По умолчиню null.|
|activeView|ID активной View.|
|activePanel|ID активной панели.|
|hash|Текущее значение хеш.|

|Actions|Description|
|----|----|
|toModal|Метод для открытия модалки. В качестве аргумента передаем ID модалки.|
|toPopout|Метод для открытия алерта. В качестве аргумента передаем компонент с алертом или данные по принципу модалки.|
|toView|Метод для перехода на нужную View. В качестве аргумента передаем ID View (должна быть в structure).|
|toPanel|Метод для перехода на нужную Panel. В качестве аргумента передаем ID панели (должна быть в structure).|
|toHash|Метод для перехода по маршруту на основании известного хеша. В качестве аргумента строка с хешем. Сопоставит structure hash и при совпадении активирует нужный маршрут.|
|toBack|Метод возврата на предыдущий маршрут. Благодаря хранения истории и structure сам знает куда направить пользователя. Передача аргументов не требуется.|
|resetHistory|Сбрасывает историю переходов|

### Modals and Popouts
В интерфейсах VKUI модалки и алерты являются разными сущностями с различным реализацией. Данная библиотека предлагает все лишь место под хранение во внутреннем сторе, а также добавляет обработку закрытие окна по системной кнопке назад обнуляя свойства modal и popout. Если необходимости в этом нет, можно не использовать.

### Hash
Конечный хеш складывается из значений хеша View и её панели, которые мы задали в structure с помощью конкатенации. Можно обойти слияние хеша для панели, если указать # в начале строки. 

|Views hash|Panels hash|Final hash|
|----|----|----|
|main|/about|main/about|
|main|-about|main-about|
|main||main|
|main|#about|about|

### Загрузка приложения по нужному маршруту
Метод toHash позволяет по хеш-ссылке сразу попасть на нужную View и Panel. Хеш должен быть валидный таблице выше. При инициализации библиотека сама попытается прочитать hash из урла и сопоставить с нужным маршрутом для перенаправления.

```js
// По умолчанию вызывается при загрузке приложения
const hash = window.location.hash.slice(1);
router.toHash(hash);
```

## License

The MIT License.
