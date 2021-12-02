import React from 'react';
import { Linking, Platform, FlatList, View } from 'react-native';
import { loadAccessToken } from '../actions/AccessToken';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MAIN_COLOR } from '../styles/style';
import { Wander } from 'react-native-animated-spinkit';


export const makeid = () => {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?:|.,';

    for (var i = 0; i < 20; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};
const convertUrl = `http://52.76.47.121:4500/api/getconvert?videoIds=`;
export const convertToVideo = url => {
    return new Promise((resolve, reject) => {
        fetch(convertUrl + youtube_parser(url))
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
};
export const ConvertToKhmerNumber = number => {
    // var arr = number.toString().replace(/\D/g, '0').split('').map(Number);
    var arr = Array.from(String(number));
    let kh_number = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    let convert = '';
    arr.map(res => {
        if (res !== ',' && res !== '.') {
            convert = convert + kh_number[res];
        } else convert = convert + res;
    });
    return convert;
};
export const ConvertToKhmerDate = date => {
    var day = [
        'អាទិត្យ',
        'ច័ន្ទ',
        'អង្គារ',
        'ពុធ',
        'ព្រហស្បតិ៍',
        'សុក្រ',
        'សៅរ៍',
    ];
    var number = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    var month = [
        'មករា',
        'កុម្ភៈ',
        'មីនា',
        'មេសា',
        'ឧសភា',
        'មិថុនា',
        'កក្កដា',
        'សីហា',
        'កញ្ញា',
        'តុលា',
        'វិច្ឆិកា',
        'ធ្នូ',
    ];
    let convert = ' ';
    convert = convert + 'ថ្ងៃ' + day[date.getDay()] + ', ';
    const on_date = Array.from(date.getUTCDate().toString());
    on_date.map(res => {
        convert = convert + number[res];
    });
    convert = convert + ' ' + month[date.getMonth()] + ' ';
    const on_year = Array.from(date.getFullYear().toString());
    on_year.map(res => {
        convert = convert + number[res];
    });
    return convert;
};

export const ConvertDateToTime = date => {
    let hour = date.getHours();
    if (Number(hour) < 10) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes();
    if (Number(minute) < 10) {
        minute = '0' + minute;
    }
    let am_pm = Number(hour) > 12 ? 'PM' : 'AM';
    let convert = hour + ':' + minute + ' ' + am_pm;
    return convert;
};

export const ConvertDateToString = date => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getUTCDate();
    if (Number(month) < 10) {
        month = '0' + month;
    }
    if (Number(day) < 10) {
        day = '0' + day;
    }
    let convert = year + '-' + month + '-' + day;
    return convert;
};

export const ConvertToEnglishDate = date => {
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    let convert = ' ';
    convert =
        convert +
        day[date.getDay()] +
        ', ' +
        date.getDate() +
        ' ' +
        month[date.getMonth()] +
        ' ' +
        date.getFullYear();
    return convert;
};
export const ConvertToKhmerDateNoDay = date => {
    var number = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    var month = [
        'មករា',
        'កុម្ភៈ',
        'មីនា',
        'មេសា',
        'ឧសភា',
        'មិថុនា',
        'កក្កដា',
        'សីហា',
        'កញ្ញា',
        'តុលា',
        'វិច្ឆិកា',
        'ធ្នូ',
    ];
    let convert = 'ថ្ងៃទី';
    const on_date = Array.from(date.getUTCDate().toString());
    if (on_date.length === 1) convert += '០';
    on_date.map(res => {
        convert += number[res];
    });
    convert += ' ខែ' + month[date.getMonth()] + ' ឆ្នាំ';
    const on_year = Array.from(date.getFullYear().toString());
    on_year.map(res => {
        convert += number[res];
    });
    return convert;
};

export const pad = (num, size) => {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
};

export const ConvertToEnglishDateNoDay = (date, is_short = false) => {
    var month = is_short
        ? [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
        : [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    let convert = '';
    if (date.getUTCDate() < 10) convert = convert + '0';
    convert =
        convert +
        month[date.getMonth()] +
        ' ' +
        date.getUTCDate() +
        ', ' +
        date.getFullYear();
    return convert;
};
export const NumberWithCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const dateDiffInDays = (publish_date, current_date) => {
    var dt1 = new Date(publish_date);
    var dt2 = new Date(current_date);
    const cal = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getUTCDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getUTCDate())) /
        (1000 * 60 * 60 * 24),
    );
    let duration = '';
    if (cal == 0) {
        if (dt2.getHours() - dt1.getHours() <= 0) {
            duration = 'Now';
        } else {
            duration = dt2.getHours() - dt1.getHours() + 'h';
        }
    } else if (cal > 0) {
        duration = cal + 'd';
    } else {
        duration = '-';
    }
    return duration;
};
export const dateDiff = (date_1, date_2) => {
    var dt1 = new Date(date_1);
    var dt2 = new Date(date_2);
    return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getUTCDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getUTCDate())) /
        (1000 * 60 * 60 * 24),
    );
};
export const dateDiffInNotification = publish_date => {
    var dt1 = new Date(publish_date);
    var dt2 = new Date();
    const cal = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getUTCDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getUTCDate())) /
        (1000 * 60 * 60 * 24),
    );
    let duration = '';
    if (cal == 0) {
        if (dt2.getHours() - dt1.getHours() <= 0) {
            duration = 'Just Now';
        } else {
            duration =
                dt2.getHours() -
                dt1.getHours() +
                ' hour' +
                (dt2.getHours() - dt1.getHours() === 1 ? '' : 's') +
                ' ago';
        }
    } else if (cal === 1) {
        duration = 'Yesterday at ' + ConvertDateToTime(dt1);
    } else if (cal < 7) {
        duration = ConvertToEnglishDayDate(dt1) + ' at ' + ConvertDateToTime(dt1);
    } else if (cal > 6) {
        duration =
            ConvertToEnglishDateNoDay(dt1, true) + ' at ' + ConvertDateToTime(dt1);
    } else {
        duration = '';
    }
    return duration;
};
export const ConvertToEnglishDayDate = date => {
    let convert = '';
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    convert = day[date.getDay()];
    return convert;
};

export const convertHMS = value => {
    if (value < 1) {
        return '00:00';
    } else {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
        let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
        // add 0 if value < 10
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (hours < 1 ? '' : hours + ':') + minutes + ':' + seconds; // Return is HH : MM : SS
    }
};

export const loadAudio = (
    TrackPlayer,
    playContext,
    navigate,
    book,
    is_preview,
) => {
    TrackPlayer.getQueue().then(value => {
        let check = value.filter(r => r.source !== book.id);
        if (check.length > 0) {
            playContext.stop();
            playContext.setCurrentTrack(null);
            check.map((track, index) => {
                TrackPlayer.remove(track.id).then(data => {
                    if (check.length - 1 === index) {
                        navigate.navigate('BookListen', {
                            is_preview: is_preview,
                            book,
                            currentPosition: 0,
                            currentDuration: 0,
                        });
                    }
                });
            });
        } else {
            navigate.navigate('BookListen', {
                is_preview: is_preview,
                book,
            });
        }
    });
};
export function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export function percentFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '%';
}
export const makeCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
};

export const default_url = `https://business-cambodia.com/api/`;
export const url = `http://cefloan.phsartech.com/api/v1/`;
export function totalAmount(qty, price) {
    let total = 0;
    total = qty * price;
    return total;
}
export function onTotalAmount(cart) {
    let _total_amount = 0;
    if (cart !== null) {
        cart.map(item => {
            _total_amount += item.product_price * item.qty;
        });
    }
    return _total_amount;
}
export function totalDiscount(price, discount, type) {
    let total = 0;
    if (type === 'dollar') {
        total = price - discount;
    } else {
        total = price - (price * discount) / 100;
    }
    return total;
}
export function addToCart(user_id, product_id, qty, token) {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        fetch(
            `${default_url}add-cart?user_id=${user_id}&product_id=${product_id}&qty=${qty}`,
            {
                method: 'POST',
                headers: myHeaders,
            },
        )
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export function fetchBasicApi(alias) {
    let url = default_url + alias;
    return new Promise(async (resolve, reject) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export function fetchToken() {
    // let url = default_url + alias + '?';
    return new Promise(async (resolve, reject) => {
        await fetch(`${default_url}login?email=admin@gmail.com&password=12345678`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export function fetchBasicApiWithToken(alias, token) {
    let url = default_url + alias + '?';
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    return new Promise(async (resolve, reject) => {
        await fetch(url, {
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
}
export const BackIcon = navigate => {
    return (
        <TouchableOpacity onPress={() => navigate.goBack()}>
            <AntDesign name="arrowleft" size={25} color={MAIN_COLOR} />
        </TouchableOpacity>
    );
};
export const articleHtml = ({ body }) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </head>
    <body style="padding:0px;margin:0px;">
        ${body}
    </body>
</html>
`;
export async function checkLink(link_ios, link_android) {
    const link = Platform.OS === 'ios' ? link_ios : link_android;
    const supported = await Linking.canOpenURL(`${link}`);
    if (supported) Linking.openURL(`${link}`);
    else {
        Linking.openURL(`${link_ios}`);
    }
}

export const Loading = () => {
    return (
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
            <Wander size={40} color={MAIN_COLOR} />
        </View>
    )
}

export const FetchState = {
    LOADING: 'loading',
    DONE: 'done',
    PROBLEM: 'problem',
    ERROR: 'error',
};
export function deepLink(type, alias) {
    if (type === Type.WEBSITE) {
        Linking.openURL(`${alias}`);
        return;
    }
    if (type === Type.FACEBOOK) {
        let link_ios = `http://www.facebook.com/${alias}`;
        let link_android = `fb://facewebmodal/f?href=http://www.facebook.com/${alias}`;
        checkLink(link_ios, link_android);
    } else if (type === Type.YOUTUBE) {
        let link_ios = `http://www.youtube.com/channel/${alias}`;
        let link_android = `vnd.youtube://channel/${alias}`;
        checkLink(link_ios, link_android);
    } else if (type === Type.TELEGRAM) {
        let link_ios = `http://t.me/joinchat/${alias}`;
        let link_android = `tg:join?invite=${alias}`;
        checkLink(link_ios, link_android);
    } else if (type === Type.TWITTER) {
        let link_ios = `http://twitter.com/${alias}`;
        let link_android = `twitter://user?screen_name=${alias}`;
        checkLink(link_ios, link_android);
    }
}
export function fetchPOSTImageApi(alias, params) {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers();
        //  myHeaders.append("Authorization", `Bearer ${access_token}`);
        myHeaders.append('Content-Type', 'multipart/form-data');
        var formdata = new FormData();

        formdata.append('image', {
            uri: params,
        });

        var requestOptions = {
            method: 'POST',
            //  headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };
        fetch(`${image_url}${alias}?`, requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

export function fetchPOSTApi(alias, params) {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers();
        //  myHeaders.append("Authorization", `Bearer ${access_token}`);
        myHeaders.append('Content-Type', 'multipart/form-data');

        var formdata = new FormData();
        formdata.append('image', params.image);
        formdata.append('name', params.name);
        formdata.append('user_id', params.user_id);
        //  formdata.append("des", params.des);
        //  formdata.append("category_id", params.category_id);
        if (params.id !== '') formdata.append('id', params.id);

        var requestOptions = {
            method: 'POST',
            //  headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };
        fetch(`${default_url}${alias}?`, requestOptions)
            .then(response => response.text())
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

export const dateDiffInHours = publish_date => {
    var dt1 = new Date(publish_date);
    var dt2 = new Date();

    const cal = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getUTCDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getUTCDate())) /
        (1000 * 60 * 60 * 24),
    );
    let duration = '';
    if (cal == 0) {
        if (dt2.getHours() - dt1.getHours() <= 0) {
            if (dt2.getMinutes() - dt1.getMinutes() <= 0) {
                duration = 'មុននេះបន្តិច';
            } else {
                duration =
                    ConvertToKhmerNumber(dt2.getMinutes() - dt1.getMinutes()) + 'នាទីមុន';
            }
        } else {
            duration =
                ConvertToKhmerNumber(dt2.getHours() - dt1.getHours()) + 'ម៉ោងមុន';
        }
    } else if (cal == 1) {
        duration = 'ពីម្សិលមិញ';
    } else {
        duration = ConvertToKhmerNumber(cal) + 'ថ្ងៃមុន';
    }
    return duration;
};

export function youtube_parser(url) {
    var ID = '';
    url = url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
}

export function facebook_parser(url) {
    const regex = /(\d+)\/?$/;
    let match = regex.exec(url);
    return match !== null && match.length > 0 ? match[0] : false;
}
export function FlatListScroll(props) {
    return (
        <FlatList
            {...props}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            data={['dumy']}
            renderItem={() => {
                return props.children;
            }}
            bounces={false}
            scrollEventThrottle={16}
            ListEmptyComponent={null}
            ListHeaderComponent={null}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}
export function FlatListVertical(props) {
    return (
        <FlatList
            {...props}
            listKey={makeid()}
            cellKey={makeid()}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            data={props.data}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.01}
            renderItem={props.renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}
export function FlatListHorizontal(props) {
    return (
        <FlatList
            {...props}
            listKey={makeid()}
            cellKey={makeid()}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={Platform.OS === 'ios' ? false : true}
            horizontal
            data={props.data}
            // bounces={false}
            scrollEventThrottle={16}
            renderItem={props.renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}
export const Type = {
    WEBSITE: 'website',
    FACEBOOK: 'facebook',
    YOUTUBE: 'youtube',
    VIDEO: 'video',
    TELEGRAM: 'telegram',
    TWITTER: 'twitter',
    MESSENGER: 'messenger',
    API: 'api',
};
