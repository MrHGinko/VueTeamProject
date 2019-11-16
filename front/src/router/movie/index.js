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
        },
        {
            path: 'search',
            component: () =>
                import ('../../views/Movie/Search/index')
        },
        {
            path: 'detail/:id',
            props: true,
            component: () =>
                import ('../../views/Movie/NowPlaying/detail/detail')
        }
    ]
}