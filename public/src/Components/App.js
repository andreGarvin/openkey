// const app = new Vue({
//     el: '#app',
//     data: {
//         url: '',
//         time: '5',
//         keys: [],
//         resp: false,
//         report: false,
//         createdKey: false,
//     },
//     methods: {
//         // this makes the divs linkable
//         goto: function(url) {
//             if (!this.report) {
//                 return window.open(url, '_blank')
//             }
//         },
//         // sending a report to the openkey API
//         sendReport: function(key) {
//             this.report = true

//             const reports = JSON.parse( localStorage.getItem('reports') );

//             // if the have made a report already then do not send the report
//             if (reports[key] === undefined) {
//                 const newReport = {}
//                 newReport[key] = new Date().getDate()
//                 localStorage.setItem('reports', JSON.stringify(Object.assign(reports, newReport)))
                
//                 const reportMessage = prompt('')
//                 axios.post.call(this, '/api/report_key', {
//                     initialReportMessage: reportMessage,
//                     key,
//                 })
//                     .then(resp => {
//                         resp = resp.data

//                         this.keys = this.keys.map(k => {
//                             if (k.key === key) {
//                                 k.reported = true
//                                 return k
//                             }
//                             return k
//                         })
//                         if (resp.resolved) {
//                             return alert('This key has etheir been removed or has expired')
//                         }
//                         return alert('Thank for reporting the issue for this key making the site safe for others to enjoy.')
//                     })
//             }
//         },
//         /*
//             fetchs all the keys from the openkey database through the API
//             endpoint '/api/fetch_keys'
//         */
//         fetchKey: function() {
//             const key = prompt('Insert key alias name here.')
//             axios.get.call(this, '/api/fetch_key?key=' + key)
//                 .then(resp => {
//                     window.open(resp.data.key.url, '_blank')
//                 })
//                 .catch(resp => {
//                     if (resp.statusCode !== 500) {
//                         this.resp = resp.data
//                     } else {
//                         this.resp = {
//                             errorMessage: 'There is a internal server error'
//                         }
//                     }
//                 })
//         },
//         /*
//             fetchs a sepcfic key from the openkey database
//             through the API at the '/api/fetch_key?k=' endpoint
//         */
//         fetchKeys: function() {
//             axios.get.call(this, '/api/fetch_keys')
//                 .then(resp => {
//                     const reports = JSON.parse( localStorage.getItem('reports') )
//                     this.keys = resp.data.keys.map(k => {
//                         if (reports[k.key] === undefined) {
//                             k.reported = false;
//                             return k;
//                         } else if (reports[k.key] !== new Date().getDate()) {
//                             delete reports[k.key]
//                             localStorage.setItem('reports', JSON.stringify(reports))
//                             return k
//                         } else {
//                             k.reported = true;
//                             return k
//                         }
//                     });
//                 })
//                 .catch(err => console.log(err))
//         },
//         /*
//             creates a key and stores it to the openkey database through
//             API at the endpoint '/api/create_key?url=&time='
//         */
//         createKey: function() {
//             const postUrl = '/api/create_key?url=' + this.url + '&time=' + this.time
//             axios.post.call(this, postUrl)
//                 .then(resp => {
//                     this.resp = resp.data
//                     this.createdKey = true;
//                 })
//                 .catch(resp => {
//                     if (resp.statusCode !== 500) {
//                         this.resp = resp.data
//                     } else {
//                         this.resp = {
//                             errorMessage: 'There is a internal server error'
//                         }
//                     }
//                 })
            
//             this.url = '';
//         }
//     }
// })
// app.fetchKeys()

// if ( localStorage.getItem('reports') === null ) {
//     localStorage.setItem('reports', JSON.stringify({}))
// }