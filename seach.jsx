(function(){
    var Images = function(){//選択したリンク画像と置き換える画像を取得
        this.images = activeDocument.placedItems;
        $.writeln(toString.call(activeDocument.placedItems));
        this.fileList = (function(){
            var fileList = [];
            var mainFolder = Folder.selectDialog("フォルダを選択してください");
            if(!mainFolder){
                return false;
            }
            var files = mainFolder.getFiles();
            for(var i=0;i<files.length;i++){
                if(files[i].getFiles !== undefined){//フォルダー以外取得
                    continue;
                }else{
                    fileList.push(decodeURI(files[i]));//日本語にも対応するようにデコード
                }
            }
            return fileList;
        })();
    }

    Images.prototype.replace = function(){//リンクファイル置き換え
        if(!this.fileList){
            return;
        }
        for(var i=0;i<this.images.length;i++){
            for(var j=0;j<this.fileList.length;j++){
                var flag = isNameSame(this.images[i].file.name,this.fileList[j]);
                if(flag){
                    this.images[i].file = new File (this.fileList[j]);//置き換え
                }
            }
        }

        function isNameSame(reName,Folname){//ファイル名が同じか確認
            var name1 = decodeURI(reName);
            var name2 = new File(Folname);
            return name1 === name2.name;
        }
    }

    var img = new Images();
    img.replace();
})();