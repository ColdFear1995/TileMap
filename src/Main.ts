//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    map: GMap;
    grid: Grid;
    tilesize = 64;
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        this.touchEnabled = true;

        this.map = new GMap();
        this.addChild(this.map);
        var startx = 0;
        var starty = 0;
        var endx = 0;
        var endy = 0;

        var astar: AStar;

        var numCols = 10;
        var numRows = 10;
        this.grid = new Grid(numCols, numRows);

        for (var i = 0; i < mapconfig.length; i++) {

            this.grid.setWalkable(mapconfig[i].x, mapconfig[i].y, mapconfig[i].walkable);
        }

        this.grid.setStartNode(startx, starty);
        this.grid.setEndNode(endx, endy);

        var astar = new AStar();
        astar.findPath(this.grid);

        var path = astar.getpath();


        for (var i = 0; i < path.length; i++) {

            console.log("x:" + path[i].x + " y:" + path[i].y + "\n");
        }



        var playerStage = new egret.DisplayObjectContainer();
        playerStage.width = this.stage.stageWidth;
        playerStage.height = this.stage.stageHeight;
        this.addChild(playerStage);
        var startpointX = 0;
        var startpointY = 0;
        var targetpointX: number;
        var targetpointY: number;
        var sign: number;
        var reachend: boolean;
        var reachtarget: boolean;
        var indexofpath: number;
        indexofpath = 0;
        sign = 0;   //状态标志
        reachtarget = true;
        reachend = true;

        var playeridle01: egret.Bitmap = this.createBitmapByName("1_01_gif");
        var playermove01: egret.Bitmap = this.createBitmapByName("1_02_gif");
        var playermove02: egret.Bitmap = this.createBitmapByName("1_03_gif");
        var playermove03: egret.Bitmap = this.createBitmapByName("1_04_gif");
        var startState0: Function = function () {    //四个需要的功能

            var startidleanime: Function = function () {

                playerStage.addChild(playeridle01);
                var anime01 = egret.Tween.get(playeridle01);
                anime01.to({ "alpha": 1 }, 0);
                anime01.call(startidleanime, self);

            }

            startidleanime();

        }

        var stopState0: Function = function () {

            var stopidleanime: Function = function () {
                egret.Tween.removeAllTweens();
                playeridle01.alpha = 0;


            }

            stopidleanime();

        }

        var startState: Function = function () {

            var startMove: Function = function () {

                playerStage.addChild(playermove01);
                playerStage.addChild(playermove02);
                playerStage.addChild(playermove03);


                var anime01 = egret.Tween.get(playermove01);
                var anime02 = egret.Tween.get(playermove02);
                var anime03 = egret.Tween.get(playermove03);




                anime01.to({ "alpha": 1 }, 0);
                anime02.to({ "alpha": 0 }, 0);
                anime03.to({ "alpha": 0 }, 0);


                anime01.wait(100);
                anime02.wait(100);
                anime03.wait(100);


                anime01.to({ "alpha": 0 }, 0);
                anime02.to({ "alpha": 1 }, 0);
                anime03.to({ "alpha": 0 }, 0);


                anime01.wait(100);
                anime02.wait(100);
                anime03.wait(100);


                anime01.to({ "alpha": 0 }, 0);
                anime02.to({ "alpha": 0 }, 0);
                anime03.to({ "alpha": 1 }, 0);


                anime01.call(startMove, self);



            }

            var humanMove: Function = function () {


                var playerPointX: number;
                var playerPointY: number;
                var humanSpeed: number;

                humanSpeed = 0.5;   //设置速度

                var anime01 = egret.Tween.get(playerStage);     //开始移动
                var anime02 = egret.Tween.get(playerStage);
                //var anime03 = egret.Tween.get(this);

                playerPointX = playerStage.x;
                playerPointY = playerStage.y;

                var distance: number = Math.sqrt(Math.pow((playerPointX - targetpointX), 2) + Math.pow((playerPointY - targetpointY), 2));
                var time = distance / humanSpeed * 2;

                anime01.to({ "x": targetpointX }, time);
                anime02.to({ "y": targetpointY }, time);
                //anime03.wait(time);

                anime01.call(changeTarget);

            }

            startMove();
            humanMove();

        }

        var stopState1: Function = function () {

            var stopMove: Function = function () {

                playermove01.alpha = 0;
                playermove02.alpha = 0;
                playermove03.alpha = 0;
                egret.Tween.removeAllTweens();

            }

            stopMove();

        }



        var playeridleState = new PlayerState(startState0, stopState0);   //三个状态的初始化

        var playermoveState = new PlayerState(startState, stopState1);

        var currentState = playeridleState;




        function notetouchpos(e: egret.TouchEvent): void {      //在主函数中运行的部分

            //targetpointX = e.stageX;
            //targetpointY = e.stageY;

            indexofpath = 0;
            //astar.clearpath();

            startx = Math.floor(playerStage.x / this.tilesize);
            starty = Math.floor(playerStage.y / this.tilesize);

            endx = Math.floor(e.stageX / this.tilesize);
            endy = Math.floor(e.stageY / this.tilesize);

            console.log("startX:" + startx + " starty:" + starty + "\n");
            console.log("endx:" + endx + " endy:" + endy + "\n");

            this.grid.setStartNode(startx, starty);
            this.grid.setEndNode(endx, endy);
            astar.findPath(this.grid);

            path = astar.getpath();

            for (var i = 0; i < path.length; i++) {

                console.log("[" + i + "]  x:" + path[i].x + " y:" + path[i].y + "\n");
            }



            targetpointX = path[indexofpath].x * 64;
            targetpointY = path[indexofpath].y * 64;

            reachtarget = false;
            //reachend = false;
            sign = 1;
            stateCheck();

        }

        var stateCheck: Function = function () {

            switch (sign) {

                case 0:

                    stateChange(playeridleState);
                    break;

                case 1:

                    stateChange(playermoveState);
                    break;

            }

        }

        var stateChange: Function = function (nextState: State) {  //状态改变函数

            currentState.onExit();

            currentState = nextState;

            currentState.onEnter();


        }




        stateChange(playeridleState);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, notetouchpos, this);



        var changeTarget: Function = function () {

            if (playerStage.x == targetpointX && playerStage.y == targetpointY) {
                indexofpath++;

                if (indexofpath < path.length) {
                    targetpointX = path[indexofpath].x * 64;
                    targetpointY = path[indexofpath].y * 64;
                    sign = 1;
                    stateCheck();
                } else {

                    path = [];
                    indexofpath = 0;
                    sign = 0;
                    stateCheck();
                }

            }
        }

    }

public createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}

interface State {

    onenter: Function;
    onexit: Function;

    onEnter();
    onExit();

}

class PlayerState implements State {

    onenter: Function;
    onexit: Function;

    constructor(enter: Function, exit: Function) {

        this.onenter = enter;
        this.onexit = exit;

    }


    onEnter() {

        this.onenter();

    }

    onExit() {

        this.onexit();

    }


}

