export default {
    path: '/movie',
    component: () =>
        import ('../../views/Movie/index.vue'),
    children: [{
            path: 'city',
            component: () =>
                import ('../../views/Movie/City/index')
        },
        {
            path: 'commingsoon',
            component: () =>
                import ('../../views/Movie/CommingSoon/index')
        },
        {
            path: 'nowplaying',
            component: () =>
                import ('../../views/Movie/NowPlaying/index'),
            children: [{
                path: 'detail/:id',
                component: () =>
                    import ('../../views/Movie/NowPlaying/detail/detail.vue')
            }]
        },
        {
            path: 'search',
            component: () =>
                import ('../../views/Movie/Search/index')
        }
    ]
}