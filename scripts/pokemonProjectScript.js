const genMap = {
    'Kanto': '1',
    'Johto': '2',
    'Hoenn': '3',
    'Sinnoh': '4',
    'Unova': '5',
    'Kalos': '6',
    'Alola': '7',
    'Galar': '8'
}

const treeData = {
    'Kanto': {
        'quadruped': 25,
        'bipedal, tailed': 34,
        'insectoid': 7,
        'serpentine': 8,
        'two or more pairs of wings': 5,
        'single pair of wings': 12,
        'bipedal, tailless': 20,
        'head and legs': 7,
        'head and a base': 7,
        'multiple bodies': 4,
        'tentacles or multiped': 4,
        'head and arms': 6,
        'with fins': 6,
        'only a head': 7
    },
    'Johto':{
        'quadruped': 22,
        'bipedal, tailed': 24,
        'insectoid': 4,
        'serpentine': 5,
        'two or more pairs of wings': 3,
        'single pair of wings': 13,
        'bipedal, tailless': 15,
        'head and legs': 2,
        'head and a base': 2,
        'multiple bodies': 0,
        'tentacles or multiped': 1,
        'head and arms': 0,
        'with fins': 4,
        'only a head': 5
    },
    'Hoenn':{
        'quadruped': 20,
        'bipedal, tailed': 24,
        'insectoid': 8,
        'serpentine': 5,
        'two or more pairs of wings': 5,
        'single pair of wings': 9,
        'bipedal, tailless': 30,
        'head and legs': 4,
        'head and a base': 4,
        'multiple bodies': 1,
        'tentacles or multiped': 0,
        'head and arms': 8,
        'with fins': 12,
        'only a head': 11
    },
    'Sinnoh':{
        'quadruped': 26,
        'bipedal, tailed': 26,
        'insectoid': 2,
        'serpentine': 6,
        'two or more pairs of wings': 4,
        'single pair of wings': 8,
        'bipedal, tailless': 16,
        'head and legs': 2,
        'head and a base': 7,
        'multiple bodies': 3,
        'tentacles or multiped': 2,
        'head and arms': 8,
        'with fins': 2,
        'only a head': 8
    },
    'Unova':{
        'quadruped': 31,
        'bipedal, tailed': 34,
        'insectoid': 9,
        'serpentine': 1,
        'two or more pairs of wings': 1,
        'single pair of wings': 17,
        'bipedal, tailless': 26,
        'head and legs': 1,
        'head and a base': 7,
        'multiple bodies': 4,
        'tentacles or multiped': 7,
        'head and arms': 12,
        'with fins': 8,
        'only a head': 7
    },
    'Kalos':{
        'quadruped': 21,
        'bipedal, tailed': 38,
        'insectoid': 2,
        'serpentine': 7,
        'two or more pairs of wings': 3,
        'single pair of wings': 11,
        'bipedal, tailless': 14,
        'head and legs': 1,
        'head and a base': 7,
        'multiple bodies': 4,
        'tentacles or multiped': 2,
        'head and arms': 9,
        'with fins': 2,
        'only a head': 4
    },
    'Alola':{
        'quadruped': 24,
        'bipedal, tailed': 16,
        'insectoid': 6,
        'serpentine': 6,
        'two or more pairs of wings': 2,
        'single pair of wings': 13,
        'bipedal, tailless': 17,
        'head and legs': 3,
        'head and a base': 4,
        'multiple bodies': 2,
        'tentacles or multiped': 4,
        'head and arms': 6,
        'with fins': 5,
        'only a head': 5
    },
    'Galar':{
        'quadruped': 34,
        'bipedal, tailed': 32,
        'insectoid': 4,
        'serpentine': 7,
        'two or more pairs of wings': 2,
        'single pair of wings': 15,
        'bipedal, tailless': 25,
        'head and legs': 4,
        'head and a base': 7,
        'multiple bodies': 2,
        'tentacles or multiped': 6,
        'head and arms': 5,
        'with fins': 5,
        'only a head': 4
    }
};

const columnData = {
    'Anthropomorphic':[],
    'Non-Anthropomorphic':[]
}
const pieData = {}

for (const region in treeData) {
    let anthro = 0;
    let nonAnthro = 0;
    for (const bodyShape in treeData[region]){
        if (bodyShape == 'bipedal, tailed'||bodyShape == 'bipedal, tailless') {
            anthro += treeData[region][bodyShape];
        }
        else {
            nonAnthro += treeData[region][bodyShape];
        }
    }
    pieData[region] = [anthro, nonAnthro];
    columnData['Anthropomorphic'].push(anthro);
    columnData['Non-Anthropomorphic'].push(nonAnthro);
}

function loadPi(region) {
    anthroPieChart = Highcharts.chart('pieChart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Anthropomorphic Percentage'
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.y}'
        },
        legend: {
            align: 'center',
            verticalAlign: 'top'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                colors: ["#ED2839", "#C0C0C0"],
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.percentage:.1f} %',
                    distance: -75,
                    style: {
                        fontSize: '20px'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Body Shape',
            colorByPoint: true,
            data: [{
                name: 'Anthropomorphic',
                y: pieData[region][0]
            }, {
                name: 'Non-Anthropomorphic',
                y: pieData[region][1]
            }]
        }]
    });
}

function loadBar(region) {
    let anthroColumnChart = Highcharts.chart("columnChart", {
        chart: {
            type: 'column'
        },
        colors: ["#ED2839", "#C0C0C0"],
        title: {
            text: 'New Anthropomorphic/Non-Anthropomorphic Pokemon Designed within each Generation'
        },
        xAxis: {
            categories: ['Gen 1', 'Gen 2', 'Gen 3', "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8"],
            title: {
                text: ''
            }
        },
        yAxis: {
            min: 0,
            max: Math.max(Math.max(...columnData['Anthropomorphic']), Math.max(...columnData['Non-Anthropomorphic'])),
            title: {
                text: 'Number of New Pokemon Designed'
            },
            labels: {
                overflow: 'justify'
            },
            lineColor: '#696969',
            lineWidth: 1
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            floating: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Anthropomorphic',
            data: columnData['Anthropomorphic']
        }, {
            name: 'Non-Anthropomorphic',
            data: columnData['Non-Anthropomorphic']
        }]
    });
}

function loadTreeMap(region) {
    let treeMapChart =   Highcharts.chart('treeMap', {
            series: [{
                type: "treemap",
                layoutAlgorithm: 'stripes',
                alternateStartingDirection: true,
                levels: [{
                    level: 1,
                    layoutAlgorithm: 'sliceAndDice',
                    dataLabels: {
                        enabled: true,
                        align: 'left',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }
                    }
                }, {
                    level: 2,
                    dataLabels: {
                        style: {
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }
                    }
                }],
                data: [{
                    id:"ANTH",
                    name: "Anthropomorphic",
                    color: "#ED2839"
                }, {
                    id: "NONANTH",
                    name:"Non-Anthropomorphic",
                    color: "#C0C0C0"
                }, {
                    parent: "NONANTH",
                    name: 'quadruped',
                    value: treeData[region]['quadruped'],
                }, {
                    parent: "ANTH",
                    name: 'bipedal, tailed',
                    value: treeData[region]['bipedal, tailed'],
                }, {
                    parent: "ANTH",
                    name: 'bipedal, tailless',
                    value: treeData[region]['bipedal, tailless'],
                }, {
                    parent: "NONANTH",
                    name: 'insectoid',
                    value: treeData[region]['insectoid']
                }, {
                    parent: "NONANTH",
                    name:"serpentine",
                    value: treeData[region]["serpentine"]
                }, {
                    parent: "NONANTH",
                    name:"single pair of wings",
                    value: treeData[region]["single pair of wings"]
                }, {
                    parent: "NONANTH",
                    name:"two or more pairs of wings",
                    value: treeData[region]["two or more pairs of wings"]
                }, {
                    parent: "NONANTH",
                    name:"head and legs",
                    value: treeData[region]["head and legs"]
                }, {
                    parent: "NONANTH",
                    name:"head and a base",
                    value: treeData[region]["head and a base"]
                }, {
                    parent: "NONANTH",
                    name:"head and arms",
                    value: treeData[region]["head and arms"]
                }, {
                    parent: "NONANTH",
                    name:"only a head",
                    value: treeData[region]["only a head"]
                }, {
                    parent: "NONANTH",
                    name:"multiple bodies",
                    value: treeData[region]["multiple bodies"]
                }, {
                    parent: "NONANTH",
                    name:"tentacles or multiped",
                    value: treeData[region]["tentacles or multiped"]
                }, {
                    parent: "NONANTH",
                    name:"with fins",
                    value: treeData[region]["with fins"]
                }]
            }],
            title: {
                text: 'Amount of Body Shapes'
            }
        });
}

featuredDict = {
    'Kanto': ["images/Charizard.webp", "images/Pikachu.webp", "images/Jigglypuff.webp"],
    'Johto': ["images/Noctowl.webp", "images/Wobbuffet.webp", "images/Totodile.webp"],
    'Hoenn': ["images/Metagross.webp", "images/Rayquaza.webp", "images/Gardevoir.webp"],
    'Sinnoh':["images/Lucario.webp","images/Lumineon.webp", "images/Lopunny.webp"],
    'Unova': ["images/Cottonee.webp", "images/Reuniclus.png", "images/Excadrill.webp"],
    'Kalos':["images/Greninja.webp", "images/Trevenant.webp", "images/Braixen.png"],
    'Alola':["images/Incineroar.webp", "images/Necrozma-Ultra.webp", "images/Mimikyu.webp"],
    'Galar':["images/Hatenna.webp", "images/Scorbunny.png", "images/Dottler.webp"]
}
descriptionDict = {
    'Kanto': [
        ["Charizard", "Anthropomorphic (bipedal, tailed)", "Type: Fire/Flying"],
        ["Pikachu", "Non-Anthropomorphic (quadruped)", "Type: Electric"],
        ["Jigglypuff", "Non-Anthropomorphic (bipedal, tailless)", "Type: Normal/Fairy"]
    ],
    'Johto': [
        ["Noctowl", "Non-Anthropomorphic (single pair of wings)", "Type: Normal/Flying"],
        ["Wobbuffet", "Non-Anthropomorphic (head and a base)", "Type: Psychic"],
        ["Totodile", "Anthropomorphic (bipedal, tailed)", "Type: Water"]
    ],
    'Hoenn': [
        ["Metagross", "Non-Anthropomorphic (multiple bodies)", "Type: Psychic/Flying"],
        ["Rayquaza", "Non-Anthropomorphic (serpentine)", "Type: Dragon/Flying"],
        ["Gardevoir", "Anthropomorphic (bipedal, tailless)", "Type: Psychic/Fairy"]
    ],
    'Sinnoh':[
        ["Lucario", "Anthropomorphic (bipedal, tailed)", "Type: Fighting/Steel"],
        ["Lumineon", "Non-Anthropomorphic (with fins)", "Type: Water"],
        ["Lopunny", "Anthropomorphic (bipedal, tailed)", "Type: Normal"]
    ],
    'Unova': [
        ["Cottonee", "Non-Anthropomorphic (only a head)", "Type: Grass/Fairy"],
        ["Reuniclus", "Non-Anthropomorphic (head and arms)", "Type: Psychic"],
        ["Excadrill", "Anthropomorphic (bipedal, tailless)", "Type: Ground/Steel"]
    ],
    'Kalos':[
        ["Greninja", "Anthropomorphic (bipedal, tailless)", "Type: Water/Dark"],
        ["Trevenant", "Non-Anthropomorphic (tentacles or multiped)", "Type: Ghost/Grass"],
        ["Braixen", "Anthropomorphic (bipedal, tailed)", "Type: Fire"]
    ],
    'Alola':[
        ["Incineroar", "Anthropomorphic (bipedal, tailed)", "Type: Fire/Dark"],
        ["Ultra Necrozma", "Non-Anthropomorphic (two or more pairs of wings)", "Type: Psychic/Dragon"],
        ["Mimikyu", "Non-Anthropomorphic (serpentine)", "Type: Ghost/Fairy"]
    ],
    'Galar':[
        ["Hatenna", "Non-Anthropomorphic (head and legs)", "Type: Psychic"],
        ["Scorbunny", "Anthropomorphic (bipedal, tailed)", "Type: Fire"],
        ["Dottler", "Non-Anthropomorphic (insectoid)", "Type: Bug"]
    ],
}

function loadPokemonFeature(region) {
    document.getElementsByClassName("pokemon_gen_highlight")[0].innerHTML = 'Featured Pokemon from Generation ' + String(genMap[region])


    document.getElementsByClassName("pokemon")[0].src = featuredDict[region][0];
    document.getElementsByClassName("pokemon_name")[0].innerHTML = descriptionDict[region][0][0];
    document.getElementsByClassName("pokemon_body_shape")[0].innerHTML = descriptionDict[region][0][1];
    document.getElementsByClassName("pokemon_type")[0].innerHTML = descriptionDict[region][0][2];

    document.getElementsByClassName("pokemon")[1].src = featuredDict[region][1];
    document.getElementsByClassName("pokemon_name")[1].innerHTML = descriptionDict[region][1][0];
    document.getElementsByClassName("pokemon_body_shape")[1].innerHTML = descriptionDict[region][1][1];
    document.getElementsByClassName("pokemon_type")[1].innerHTML = descriptionDict[region][1][2];

    document.getElementsByClassName("pokemon")[2].src = featuredDict[region][2];
    document.getElementsByClassName("pokemon_name")[2].innerHTML = descriptionDict[region][2][0];
    document.getElementsByClassName("pokemon_body_shape")[2].innerHTML = descriptionDict[region][2][1];
    document.getElementsByClassName("pokemon_type")[2].innerHTML = descriptionDict[region][2][2];

    document.getElementById("totalNew").innerHTML = Number(pieData[region][0]) + Number(pieData[region][1]);
    document.getElementById("totalAnth").innerHTML = Number(pieData[region][0]);
    document.getElementById("totalNonAnth").innerHTML = Number(pieData[region][1]);
}

function init() {
    for (i = 0; i < 8; i++) {
        document.getElementsByClassName("region")[i].addEventListener("click", function() {
            loadTreeMap(this.id);
            loadPi(this.id);
            loadPokemonFeature(this.id);
          });
      }
    loadBar();
}

document.addEventListener("DOMContentLoaded", init);
