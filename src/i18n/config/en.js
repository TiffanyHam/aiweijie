/*
 * @Description: //英文翻译
 * @version: 
 * @Author: HeZhen
 * @Date: 2020-10-30 10:13:48
 * @LastEditors: HeZhen
 * @LastEditTime: 2021-03-10 15:49:53
 */
const en = {
    Header: {
        headerTitle: "Aiwejay Music Intelligent Electric Toothbrush",
    },
    index:{
        noConnect: 'Not connected',
        connect: 'Connecting',
        connected: 'Connected',
        brushModule: 'Brush heads',
        miniBrush:'Mini brush',
        uBrush:'U-shaped brush',
        brushLen: 'Modes',
        day: 'days',
        brushDay:'Bushhead use days',
        restDay: 'Remaining days of brush head',
        lastScore:'Last brushing score',
        score:'scores',
        music: 'Music',
        open: 'open',
        brushLog: 'Brushing records',
        more: 'More',
        setting: 'More settings',
        greem: 'Closed',
        newest: 'newest',
        Log: {
            brushLog: 'Brushing records',
            year: 'Year',
            month: 'Month',
            date: 'Date',
            minute: 'Minute',
            score: 'score',
            second: 'Seconds',
            week: {
                Mon: 'Mon',
                Tus: 'ues',
                Wed: 'Wed',
                Thu: 'Thur',
                Fri: 'Fri',
                Sat: 'Sat',
                Sun: 'Sun',
            },
            day: {
                Mon: 'Mon',
                Tus: 'ues',
                Wed: 'Wed',
                Thu: 'Thur',
                Fri: 'Fri',
                Sat: 'Sat',
                Sun: 'Sun',
            },
            brushLen: 'Brushing time',
            tip: 'Only keep brushing records for the last 3 months',
            the:"The",
            times:'Time'
        },
        
    },
    Log: {
        newest: 'newest',
        header: 'Brushing records',
        year: 'Year',
        month: 'Month',
        date: 'Date',
        minute: 'Minute',
        minutes: 'Minutes',
        score: 'scores',
        second: 'Seconds',
        week: {
            Mon: 'Mon',
            Tus: 'Tues',
            Wed: 'Wed',
            Thu: 'Thur',
            Fri: 'Fri',
            Sat: 'Sat',
            Sun: 'Sun',
        },
        day: {
            Mon: 'Mon',
            Tus: 'ues',
            Wed: 'Wed',
            Thu: 'Thur',
            Fri: 'Fri',
            Sat: 'Sat',
            Sun: 'Sun',
        },
        brushLen: 'Brushing time',
        tip: 'Only keep brushing records for the last 3 months'
    },
    RemainTime: {
        header: 'Brush Head Remain',
        day: 'days',
        doctorWord: 'Replace the toothbrush head every 3months.',
        rest: 'Brush a head rest',
        please: 'Please select the brush head being used',
        resetDay: 'Brushhead rest',
        btnTip: 'Please confirm that the brush head has been replaced. After the reset, the remaining time of the brush head will be calculated again. Yes or No?',
        reset: 'Reset'
    },
    LogDetail: {
        tip1:'Sweetie,Please brush your teeth carefully',
        tip2:"It's a great pity, come on next time",
        tip3:'Very good, please keep it up!',
        header: 'Toothbrush details',
        minute: 'minute',
        brushLen: 'Brushing time：',
        brushTime: 'Brushing time',
        range: 'Reference range for brushing score',
        level: {
            low: {
                title: 'Needs to be improved',
                price: '0-59'
            },
            mid: {
                title: 'General',
                price: '60-79'
            },
            hig: {
                title: 'Good',
                price: '80-100'
            },
        }
    },
    BrushTeethModel: {
        header: 'Mode',
        model: {
            level1: 'Gum care mode',
            level2: 'Cleaning mode'
        },
        lockTip: 'The device mode cannot be changed after being locked',
        lockBtn: 'Mode lock'
    },
    setting: {
        header: 'More settings',
        other: 'Other',
        options: {
            set1: {
                title: 'Anti-splash setting',
                subTitle: 'Slowly starting prevents water stains or toothpaste splashing everywhere',
                on: ''
            },
            set2: {
                title: 'Firmware upgrade',
                subTitle: '',
                on: '1.0'
            }
        },
        otherOptions: {
            methodsU: 'U-brush head brushing method',
            methodsI: 'Mini brush head brushing method',
            title2: 'FAQ',
            
        }
    },
    CommonProbl: {
        title2: 'FAQ',
        tip :"1. Bluetooth turning on but can't be searched",
        subtip:'Please check whether the device is within the effective range and whether the device can start normally',
        tip2 :'2.How to synchronize the offline brushing data ',
        subtip2:'The brushing data generated offline will be saved in the body. Until next time the toothbrush is connected with the App, the record of offline using data will update into the App accordingly',
        tip3 :'3.Data missing during data synchronization',
        subtip3:'The toothbrush end of this product has a data storage function, which can store up to 180 brushing data. If data is exceeded, the previous data will be overwritten. Please save the body data in time. The U-shaped brushing data doesn t not save single brushing time less than 10 seconds data.The Mini brushing data doesn t not save single brushing time less than 30 seconds  data. After replacing the phone, the new phone cannot synchronize the previous data',
    
    },
    brushing: {
        header: 'Real-time guidance',
        battery:'Power is less than 20%. Please charge your toothbrush',
        charge: 'It s time to charge now.',
        tipText: 'The toothbrush is running out of battery, please charge it',
        self: 'Good',
        title: 'Cute Calf Warm reminds：',
        tipText2: 'You have brushed your teeth more than twice. Frequent and excessive brushing will affect the health of your gums',
        cancle: 'Cancel',
        sure: 'Confirm',
        title2: 'Pause countdown',
        tipText3: 'Brushing time didn t reach 45 seconds',
        tipText4: "Brushing time is less than 10 seconds, the data can't be saved ",
        subtipText: 'please continue brushing',
        boothTip1: '"Cute calf "escort your teeth',
        boothTip2: 'Protect your teeth from the early age',
        boothTip3: 'Shake the toothbrush slowly from side to side',
        boothTip4: ' "Cute Calf"reminds you: Brush your teeth once in the morning and once at night',
        boothTip5: 'Sweetie, please brush your teeth carefully',
        tipTextI30: " If the brushing time is less than 30 seconds, the data will not be saved.",
        tipTextI120: "Your brushing time less than 2 min.",
    },
    brushMethods: {
        headerTitle: 'How to brush teeth with Mini brush head',
        headerTitle2: 'Brushing method of U-shaped brush head',
        tip :'Install the brush head correctly',
        subtip:'Align the power shaft and insert the brush head without rotation',
        tip2 :'Apply proper amount of toothpaste to the brush head',
        subtip2:'When the anti splash mode is off, the toothbrush should be put into the mouth before starting to prevent the toothpaste from splashing. After the splash prevention mode is turned on, start the toothbrush first and then put it into the mouth',
        tip3 :'Brush hair and gingival line at an angle of 45 degrees and move slowly to brush teeth',
        subtip3:'Gently place the brush head between the teeth and move it back and forth slowly. Do not brush hard. According to the pasteurization method, the oral cavity can be divided into 6 areas and 16 sides, and the brushing area can be changed timely according to the voice prompt during the brushing process',
        tip4 :'',
        subtip4:'Molars were divided into 3 surfaces, incisors were divided into 2 surfaces. Clean the tooth surface according to the guiding order to protect the health of teeth',
        tip5 :'Clean toothbrush',
        subtip5:'After brushing, flush the toothbrush head against the water and dry it',
        tip6 :'Install the brush head correctly',
        subtip6:'Parallel to the fuselage, align the socket hole with the output shaft of the fuselage, and install it in place',
        tip7 :'Pour mousse toothpaste into the braces',
        subtip7:'U toothbrush recommends mousse toothpaste and foam toothpaste. If you use ordinary toothpaste, you need to wet U brush head',
        tip8 :'Start brushing your teeth',
        subtip8:'Put it into the mouth, gently close the upper and lower teeth on the U-shaped alveolar, and then turn on the switch. Shake left and right hand to touch the left and right teeth, 45 seconds can complete a comfortable and fast tooth cleaning process',
        tip9 :'Clean toothbrush',
        subtip9:'After brushing, flush the toothbrush head against the water and dry it',  
    },
    Dialog: {
        seconds:'S',
        tipText: 'After reset, the brush head remain days counts down from 89days, reset now?',
        cancle: 'Cancel',
        sure: 'Confirm',
    },
    Hint: {
        tipTitle:'connection failed',
        tipText: 'The device is not connected, please:',
        tipText1: '1. Turn on mobile Bluetooth',
        tipText2: '2. Ensure the toothbrush within the effective range place',
        tipText3: '3. Check the device can start normally',
        tipText4: '4. Search for the Bluetooth and connect again',
        sure:'Confirm'
    },
    guide1: {
        header_inner: 'Real-time guidance',
        subheader: 'Please clean each tooth surface in order',
        left: 'left',
        right: 'right',
        low_bettery: 'Power is less than 20% now. "Cute Calf" reminds you to charge your toothbrush in time',
        low_bettery2: 'It s time to charge now',
        tipText: 'No Power, please charge it ',
        self: 'OK',
        title: ' "Cute Calf" Warm reminds',
        tipText2: 'You have brushed your teeth more than twice. Frequent and excessive brushing will affect the health of your gums ',
        cancle2: 'Go on',
        sure2: 'End',
        title3: 'Pause countdown',
        tipText3: 'Brushing time didn t reach 45 seconds,please continue brushing',
        tipText4: "Brushing time is less than 30 seconds, data can't be saved please continue brushing",
        subtipText: 'please continue brushing',
        boothTip1: 'Cute calf escort your teeth',
        boothTip2: 'Protect your teeth from the early age',
        boothTip3: ' Cute Calf reminds you: Brush your teeth once in the morning and once at night',
        boothTip4: 'Sweetie, please brush your teeth carefully',
        boothTip5: 'If you want to exit, please pause brushing your teeth first',
        boothTip6: 'returning directly or running in the background will make the brushing data lost',
        areas1: '左下区：外侧',
        areas2: '左下区：咬合面',
        areas3: '左下区：内侧',
        areas4: '中下区：外侧',
        areas5: '中下区：内侧',
        areas6: '右下区：外侧',
        areas7: '右下区：咬合面',
        areas8: '右下区：内侧',
        areas9: '右上区：外侧',
        areas10: '右上区：咬合面',
        areas11: '右上区：内侧',
        areas12: '中上区：外侧',
        areas13: '中上区：内侧',
        areas14: '左上区：外侧',
        areas15: '左上区：咬合面',
        areas16: '左上区：内侧',

        // areas1: 'Left Lower: Lateral',
        // areas2: 'Left Lower: occlusal surface',
        // areas3: 'Left Lower: incisor',
        // areas4: 'Middle Lower: Lateral',
        // areas5: 'Middle Lower: incisor',
        // areas6: 'Right Lower: Lateral',
        // areas7: 'Right Lower: occlusal surface',
        // areas8: 'Right Lower: incisor',
        // areas9: 'Right Upper: Lateral',
        // areas10: 'Right Upper: occlusal surface',
        // areas11: 'Right Upper: incisor',
        // areas12: 'Middle Upper: Lateral',
        // areas13: 'Middle upper: incisor',
        // areas14: 'Left Upper: Lateral',
        // areas15: 'Left Upper: occlusal surface',
        // areas16: 'Left Upper: incisor',
    },
    Reconnection: {
        index:'Low power, please charge in time',
    }
};
export default en;