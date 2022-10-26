// import { Router } from "express";
// import path from 'path'

// const sessionRouter = new Router()

// sessionRouter
//     .route('/login')
//     .get((req, res) => {
//         const user = req.session?.user
//         if (user) {
//             res.redirect('/')
//         }
//         else {
//             res.sendFile(path.resolve('./views/pages/login.html'))
//         }
//     })
//     .post((req, res) => {
//         req.session.name = req.body.name
//         res.redirect('/')
//     })

// sessionRouter
//     .route('/logout')
//     .get((req, res) => {
//         const name = req.session?.name
//         if (name) {
//             req.session.destroy(err => {
//                 if (!err) {
//                     res.render(path.resolve('./views/pages/logout.handlebars'), { name })
//                 } else {
//                     res.redirect('/')
//                 }
//             })
//         }
//         else {
//             res.redirect('/')
//         }
//     })


// export default sessionRouter