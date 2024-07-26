var rule = {
    title: '喜马拉雅',
    host: 'https://www.ximalaya.com',
    homeUrl: '/channel/7/',//网站的首页链接,用于分类获取和推荐获取
    url: '/revision/metadata/v2/channel/albums?pageNum=fypage&pageSize=50&sort=1&metadata=&groupId=fyclass',
    detailUrl: '/revision/album/v1/getTracksList?albumId=fyid',//二级详情拼接链接(json格式用)
    searchUrl: '/revision/search/main?core=album&kw=**&page=fypage&spellchecker=true&rows=20&condition=relation&device=iPhone&fq=&paidFilter=false',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'PC_UA'
    },
    class_parse: '.first .channel;a&&Text;a&&href;.*/(.*?)/',
    play_parse: true,
       lazy: `js:
    let result = {};
let Play_Ref = "https://www.ximalaya.com/sound/" + input + "/";
let url =
  "https://www.ximalaya.com/mobile-playpage/track/v3/baseInfo/".concat(Date.now()) +"?device=www2&trackId=" +input +"&trackQualityLevel=1";
let html = request(url, {
headers: { Referer: Play_Ref, "User-Agent": PC_UA,"Cookie":"wfp=ACNhODBmMTMxMjc0OTYzOWM5ORW3ebfv1MR0ZXN0;" },
});
let DD1 = new Uint8Array([
  183, 174, 108, 16, 131, 159, 250, 5, 239, 110, 193, 202, 153, 137, 251, 176,
  119, 150, 47, 204, 97, 237, 1, 71, 177, 42, 88, 218, 166, 82, 87, 94, 14, 195,
  69, 127, 215, 240, 225, 197, 238, 142, 123, 44, 219, 50, 190, 29, 181, 186,
  169, 98, 139, 185, 152, 13, 141, 76, 6, 157, 200, 132, 182, 49, 20, 116, 136,
  43, 155, 194, 101, 231, 162, 242, 151, 213, 53, 60, 26, 134, 211, 56, 28, 223,
  107, 161, 199, 15, 229, 61, 96, 41, 66, 158, 254, 21, 165, 253, 103, 89, 3,
  168, 40, 246, 81, 95, 58, 31, 172, 78, 99, 45, 148, 187, 222, 124, 55, 203,
  235, 64, 68, 149, 180, 35, 113, 207, 118, 111, 91, 38, 247, 214, 7, 212, 209,
  189, 241, 18, 115, 173, 25, 236, 121, 249, 75, 57, 216, 10, 175, 112, 234,
  164, 70, 206, 198, 255, 140, 230, 12, 32, 83, 46, 245, 0, 62, 227, 72, 191,
  156, 138, 248, 114, 220, 90, 84, 170, 128, 19, 24, 122, 146, 80, 39, 37, 8,
  34, 22, 11, 93, 130, 63, 154, 244, 160, 144, 79, 23, 133, 92, 54, 102, 210,
  65, 67, 27, 196, 201, 106, 143, 52, 74, 100, 217, 179, 48, 233, 126, 117, 184,
  226, 85, 171, 167, 86, 2, 147, 17, 135, 228, 252, 105, 30, 192, 129, 178, 120,
  36, 145, 51, 163, 77, 205, 73, 4, 188, 125, 232, 33, 243, 109, 224, 104, 208,
  221, 59, 9,
]);
let FF1 = new Uint8Array([
  204, 53, 135, 197, 39, 73, 58, 160, 79, 24, 12, 83, 180, 250, 101, 60, 206,
  30, 10, 227, 36, 95, 161, 16, 135, 150, 235, 116, 242, 116, 165, 171,
]);
let a = function (e, t, r) {
  for (var n = Math.min(e.length - t, r.length), o = 0; o < n; o++)
    e[o + t] = e[o + t] ^ r[o];
};

let getLink = function (e) {
  try {
  var  t = CryptoJS.enc.Latin1.stringify(CryptoJS.enc.Base64.parse(e.replace(/_/g, "/").replace(/-/g, "+")));
    if (null === t || t.length < 16) return e;
    for (var r = new Uint8Array(t.length - 16), i = 0; i < t.length - 16; i++)
      r[i] = t.charCodeAt(i);
    for (var u = new Uint8Array(16), c = 0; c < 16; c++)
      u[c] = t.charCodeAt(t.length - 16 + c);
    for (var s = 0; s < r.length; s++) r[s] = DD1[r[s]];
    for (var l = 0; l < r.length; l += 16) a(r, l, u);
    for (var f = 0; f < r.length; f += 32) a(r, f, FF1);
    return (function (e) {
      var t, r, n, o, a, i;
      (t = ""), (n = e.length), (r = 0);
      for (; r < n; )
        switch ((o = e[r++]) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            t += String.fromCharCode(o);
            break;
          case 12:
          case 13:
            (a = e[r++]),
              (t += String.fromCharCode(((31 & o) << 6) | (63 & a)));
            break;
          case 14:
            (a = e[r++]),
              (i = e[r++]),
              (t += String.fromCharCode(
                ((15 & o) << 12) | ((63 & a) << 6) | ((63 & i) << 0)
              ));
        }
      return t;
    })(r);
  } catch (e) {
    return console.warn(e, "secret failed"), "";
  }
};
let jo = JSON.parse(html);
let purl =getLink(jo["trackInfo"]["playUrlList"][0]["url"]);
result["parse"] = 0;
result["playUrl"] = "";
result["url"] = purl;
result["header"] = "";
input = result;
    `,
    limit: 6,
  推荐: 'js:let d=[];function home_lists(){let lists=[];let html=request(input);let jo=JSON.parse(html.match(/window.__INITIAL_STATE__ =(.*?);</)[1]);let vodList=jo.store.ChannelDetailPageV2.channelAlbumsInfo.albums;vodList.forEach(function(vod){let aid=vod["albumId"];let title=vod["albumTitle"];let img=/http/.test(vod.albumCoverPath)?vod["albumCoverPath"]:"https://imagev2.xmcdn.com/"+vod["albumCoverPath"];let remark=(vod["isPaid"]===true?"￥":"")+vod["albumListenCount"]+"❤️"+vod["intro"];lists.push({"vod_id":aid,"vod_name":title,"vod_pic":img,"vod_remarks":remark})});return lists}VODS=home_lists();',
  一级: 'js:let d=[];function cate_lists(){let lists=[];let html=request(input);let jo=JSON.parse(html);let vodList=jo.data.albums;vodList.forEach(function(vod){if(vod["vipType"]!==2){let aid=vod["albumId"];let title=vod["albumTitle"];let img=/http/.test(vod.albumCoverPath)?vod["albumCoverPath"]:"https://imagev2.xmcdn.com/"+vod["albumCoverPath"];let remark=(vod["isPaid"]===true?"￥":"")+"❤️"+vod["intro"];lists.push({"vod_id":aid,"vod_name":title,"vod_pic":img,"vod_remarks":remark})}});return lists}VODS=cate_lists();',
  二级: 'js:let d=[];let html=request(input);let json=JSON.parse(html).data.tracks[0];VOD={vod_id:"",vod_url:input,vod_name:"",type_name:"",vod_actor:"",vod_year:"",vod_director:"",vod_area:"",vod_content:"",vod_remarks:"",vod_pic:""};VOD.vod_id=json.albumId;VOD.vod_name=json.albumTitle;VOD.vod_pic=/http/.test(json.albumCoverPath)?json.albumCoverPath:"https://imagev2.xmcdn.com/"+json.albumCoverPath;VOD.vod_year=(json.createDateFormat+"").split("-")[0];VOD.vod_actor=json.anchorName;VOD.vod_director=json.anchorName;VOD.vod_content=json.albumTitle;let playlists=[];let listUrl="https://www.ximalaya.com/revision/album/v1/getTracksList?albumId="+json.albumId+"&pageSize=100&pageNum=1";let data=JSON.parse(request(listUrl)).data;let total=data.trackTotalCount;playlists=data.tracks;if(total>100){for(let i=2;i<total/100+1;i++){let listUrl="https://www.ximalaya.com/revision/album/v1/getTracksList?albumId="+json.albumId+"&pageSize=100&pageNum="+i;let data=JSON.parse(request(listUrl)).data;playlists=playlists.concat(data.tracks)}}playlists.forEach(function(it){d.push({title:"第"+it.index+"集|"+it.title,desc:it.albumTitle||it.anchorName||it.length,img:/http/.test(it.albumCoverPath)?it.albumCoverPath:"https://imagev2.xmcdn.com/"+it.albumCoverPath,url:it.trackId})});VOD.vod_play_from="ximalaya";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");',
  搜索: "json:data.album.docs;title;coverPath;intro;albumId",
}
