# etravel
##
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn run serve
```
### Compiles and minifies for production
```
yarn run build
```
##### v1.0.2
###### 新增
* 封裝storage
* 封裝api並擴充cache api 返回數據功能
* 新增eruda方便手機瀏覽器debug
* 新增data-fns避免重複造輪子
* 新增打api的loading遮罩避免重複發送請求
* 新增回傳api狀態提升UX
* 新增md5將api返回數據的key值加密存入瀏覽器storage內
###### 重構
* 將vuex各項獨立抽出方便維護管理
* 抽取出重複性高的元件獨立成component遵守DRY
###### 優化
* 減少數據架構層級
* 從共用style拆分特殊樣式css到各component內