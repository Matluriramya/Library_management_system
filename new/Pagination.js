var styles = document.documentElement.style;
var rankList=[
    {'title':'malguadi days', 'author':'rk narayan',	'subject':'theory', 'publish date':2018},
    {'title':'cindrella', 'author':'narayan',	'subject':'theory', 'publish date':2018},
    {'title':'Classical Mythology', 'author':'Mark P. O. Morford',	'subject':'theory', 'publish date':2002},
    {'title':'Clara Callan', 'author':'Richard Bruce Wright',	'subject':'story', 'publish date':2001},
    {'title':'Decision in Normandy', 'author':"Carlo D'Este",	'subject':'Real story', 'publish date':1991},
    {'title':'The Mummies of Urumchi', 'author':'E. J. W. Barber',	'subject':'thoery', 'publish date':1999},
    {'title':"The Kitchen God's Wife", 'author':'Amy Tan',	'subject':'thoery', 'publish date':1991},
    {'title':'PLEADING GUILTY', 'author':'Scott Turow',	'subject':'Crime fiction', 'publish date':1993},
    {'title':'Nights Below Station Street', 'author':'David Adams Richards',	'subject':'fiction', 'publish date':1998},
    {'title':'The Middle Stories', 'author':'Sheila Heti',	'subject':'story', 'publish date':2004},
    {'title':'Goodbye to the Buttermilk Sky', 'author':'Julia Oliver',	'subject':'Historical fiction', 'publish date':1994},
    {'title':'The Testament', 'author':'John Grisham',	'subject':'thoery', 'publish date':1999},
    {'title':'Tell Me This Isnt Happening', 'author':'Robynn Clairday',	'subject':'story', 'publish date':1999},
    {'title':'Flood : Mississippi 1927', 'author':'Kathleen Duey',	'subject':'Real story', 'publish date':1998},
    {'title':'Wild Animus', 'author':'Rich Shapero',	'subject':'Adventure fiction', 'publish date':2004},
    {'title':'Airframe', 'author':'Michael Crichton',	'subject':'Thriller', 'publish date':1997},
    {'title':'Timeline', 'author':'MICHAEL CRICHTON',	'subject':'Science fiction', 'publish date':2000},
    {'title':'OUT OF THE SILENT PLANET', 'author':'C.S. Lewis',	'subject':'thoery', 'publish date':1996},
    {'title':'Chocolate Jesus', 'author':'Stephan Jaramillo',	'subject':'funny', 'publish date':1998},
    {'title':'To Kill a Mockingbird', 'author':'Harper Lee',	'subject':'Legal story', 'publish date':1998},
    {'title':'Pigs in Heaven', 'author':'Barbara Kingsolver',	'subject':'romance', 'publish date':1993},
    {'title':'Miss Zukas and the Ravens Dance', 'author':'Jo Dereske',	'subject':'thoery', 'publish date':1996},
    {'title':'Ill Be Seeing You', 'author':'Mary Higgins Clark',	'subject':'Mystery', 'publish date':1994},
    {'title':'Isle of Dogs', 'author':'Patricia Cornwell',	'subject':'Fiction', 'publish date':2002},
    {'title':'Proxies', 'author':'Laura J. Mixon',	'subject':'Science fiction', 'publish date':1999},
    {'title':'The Street Lawyer', 'author':'JOHN GRISHAM',	'subject':'thriller', 'publish date':1999},
];

var array=[]
var array_length = 60;
var table_size=5;
var start_index=1;
var end_index=0;
var current_index=1;
var max_index=0;
var sortCol='rank';
var ascOrder= true;

function preLoadCalculations(){
    filterRankList();
    sortRankList();
    array_length=array.length;
    max_index=array_length/table_size;

    if ((array_length%table_size)>0){
        max_index++;
    }
}

function filterRankList(){
    var tab_filter_text=$("#tab_filter_text").val();
    if(tab_filter_text!=''){
        var temp_array=rankList.filter(function(object){
            return object.title.toString().includes(tab_filter_text) || object.author.toUpperCase().includes(tab_filter_text.toUpperCase()) || object.subject.toString().includes(tab_filter_text) || object["publish date"].toString().includes(tab_filter_text);
        });
        array=temp_array;
    }else{
        array = rankList;
    }
}

function sortRankList(){
    array.sort((a,b)=>{
        if(ascOrder){
            return (a[sortCol]>b[sortCol]) ? 1 : -1;
        }else{
            return (b[sortCol]>a[sortCol]) ? 1 : -1;
        }
    });

    $(".table th").removeClass('sort_indication');
    $(".table th[colName='"+sortCol+"']").addClass('sort_indication');

    if (ascOrder){
        styles.setProperty('--up_arrow_color','#ffffff');
        styles.setProperty('--up_arrow_shadow','0px 0px 10px, white');
        styles.setProperty('--down_arrow_color','#ffffff49');
        styles.setProperty('--down_arrow_shadow','0px 0px 0px, rgba(255, 255, 255, 0)');
    }else{
        styles.setProperty('--up_arrow_color','#ffffff49');
        styles.setProperty('--up_arrow_shadow','0px 0px 0px, rgba(255, 255, 255, 0)');
        styles.setProperty('--down_arrow_color','#ffffff');
        styles.setProperty('--down_arrow_shadow','0px 0px 10px, white');
    }
}

function displayIndexButtons(){
    preLoadCalculations();
    $(".index_buttons button").remove();
    $(".index_buttons").append('<button onclick="prev();">Previous</button>');

    for(var i=1; i<=max_index;i++){
        $(".index_buttons").append('<button onclick="indexPagination('+i+')" index="'+i+'">'+i+'</button>');
    }

    $(".index_buttons").append('<button onclick="next();">Next</button>');
    highlightIndexButton();
}


function highlightIndexButton(){
    start_index=((current_index-1)*table_size)+1;
    end_index=(start_index+table_size)-1;
    if (end_index > array_length){
        end_index=array_length;
    }

    $(".footer span").text('Showing '+start_index+' to '+end_index+' of '+array_length+' entries');
    $(".index_buttons button").removeClass('active');
    $(".index_buttons button[index='"+current_index+"']").addClass('active');

    displayTableRows();
}

function displayTableRows(){
    $(".container table tbody tr").remove();
    var tab_start=start_index-1;
    var tab_end=end_index;

    for(var i=tab_start;i<tab_end;i++){
        var books= array[i];
        var tr= '<tr>'+
                '<td>'+books['title']+'</td>'+
                '<td>'+books['author']+'</td>'+
                '<td>'+books['subject']+'</td>'+
                '<td>'+books['publish date']+'</td>'+
                '</tr>';

        $(".container table tbody").append(tr);
    }
}

displayIndexButtons();


function next(){
    if(current_index<max_index){
        current_index++;
        highlightIndexButton();
    }
}

function prev(){
    if(current_index>1){
        current_index--;
        highlightIndexButton();
    }
}


function indexPagination(index){
    current_index=parseInt(index);
    highlightIndexButton();
}

$("#table_size").change(function(){
    table_size=parseInt($(this).val());
    current_index=1;
    start_index=1;
    displayIndexButtons();
});

$("#tab_filter_btn").click(function(){
    current_index=1;
    start_index=1;
    displayIndexButtons();
});

$(".table th").click(function(){
    var colName=$(this).attr("colName");
    ascOrder=(sortCol == colName) ? !ascOrder: true;
    sortCol=colName;
    current_index=1;
    start_index=1;
    displayIndexButtons();
});