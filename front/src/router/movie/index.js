export default {
    path: '/movie',
    component: () =>
        import ('../../views/Movie/index.vue'),
    children: [{
            path: 'city',
            component: () =>
                import ('../../components/City/index')
        },
        {
            path: 'commingsoon',
            component: () =>
                import ('../../components/commingSoon')
        },
        {
            path: 'nowplaying',
            component: () =>
                import ('../../components/NowPlaying')
        },
        {
            path: 'search',
            component: () =>
                import ('../../components/search')
        }
    ]
}