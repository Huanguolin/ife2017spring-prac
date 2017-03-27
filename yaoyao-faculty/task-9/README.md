# task-9

## Demo本地启动说明（在线[demo](https://huanguolin.github.io/ife2017spring-prac/yaoyao-faculty/task-9/index.html)）
```
# install dependencies
npm install 

# serve with hot reload at localhost:8082
npm run dev 

# build for production with minification
npm run build

# run test
npm test
```
主要使用 `Webpack2.x + Vue2.x + scss`



## [任务说明](http://ife.baidu.com/course/detail/id/120)    

### 任务目的
综合运用各种前端技术，实现一款复杂的大型应用：在线德州扑克，成为“全栈”工程师。

### 应用简介 
任务中的“在线德州扑克”类似于“微扑克”或“德扑圈”，是朋友间组织牌局的工具应用。
这一部分，我们通过使用JavaScript编写基础算法的方式，了解德州扑克的基本规则。规则介绍参考（[百度百科](http://baike.baidu.com/link?url=jKADh0XgSlQXR1l9WRPDNauZ1sBBSCcYdzhy-xDuJIbvimpNh6St0l3d34HZWLa1w_toImFXjZXycJzkyeSfHFXcuuDEKDHmjmY3GtyO33BAiT8wuk5Wwoc1pRp9DZ6LZiNLcjNPmwn5Io1xjP_iMU21Nni8CSUEhrrzfvmXLcgsFWdpHSs-gTeK_qhPeonWjJBrIB7uzSCUDQWFTgY02zK_q7CkEUv6QwCKELM1pfK) or [维基百科](https://zh.wikipedia.org/wiki/%E5%BE%B7%E5%B7%9E%E6%92%B2%E5%85%8B)）
### 任务内容（一）
使用JavaScript实现和封装 牌型判定 和 牌面大小比较

### 任务教学
实现在线德州扑克会遇到两大逻辑难点和一个工程难点。在任务一中，我们先了解其中逻辑难点一。
德州扑克一共使用52张牌，一共4种花色，每种花色13张牌。首先我们需要一套合理的数据结构，描述这52张牌。牌型判定和比较大小，涉及很多数据计算，数据结构的设计直接影响以后程序执行效率。
教学中，我提供一种思路：使用[0-51]数值来描述52张牌，花色和牌，可以由对4 or 13取模运算和余数(0-12)来指定。
所以我们封装的类库中必不可少会有两个方法：数值到牌面的转换 和 牌面到数值的转款。例如 0 -> ♠A, ♠A -> 0。

牌型判定的思路：德州扑克中，5-7张牌均能判定牌型。牌型判定中，我们可能会构建一套逻辑分支，例如：四条和顺子，一定是在两个分支上，因为不可能有7张牌既能组成四条又同时组成顺子。另外我们还要编写算法实现同花色和连续牌的检测。

比较大小的思路：通常我们在实现棋牌类应用中，常会用到值计算，AlphaGo中就构建了一个复杂的值网络。德州扑克的大小只有几种，我们可以使用分值来计算，也可以通过化简出关键部分来比较。例如：对牌型从大到小设置level，先判定牌型取得level，不同level则直接比出结果；相同level，继续比较细节，例如“葫芦”，我们先比较三张相同的那个牌，在比较两张相同的那个牌。

以上就是对第一部分任务的抛砖引玉，希望你们能设计出更出色的算法和逻辑！
