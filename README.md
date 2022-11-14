# diance_goinfo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目文件加载后

### 需要修改flexible.js文件

```
//第69行函数
if (width / dpr > 540) {
   width = width * dpr;
}
```

