import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

import s_index from '@/components/store/s_index';
import s_datile from '@/components/store/s_datile';
import m_index_set from '@/components/member/m_index_set';
import m_index_info from '@/components/member/m_index_info';
import p_index from '@/components/project/p_index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/s_index',
      name: 'Hello',
      component: HelloWorld,
      children: [
        {
          path: '/s_index',
          name: 's_index',
          component: s_index,
        },
        {
          path: '/s_datile/:id',
          name: 's_datile',
          redirect: 's_datile/:id/m_index_set',
          component: s_datile,
          children: [
            {
              path: 'm_index_set',
              name: 'm_index_set',
              component: m_index_set,
            },
            {
              path: 'm_index_info',
              name: 'm_index_info',
              component: m_index_info,
            },
            {
              path: 'p_index/:type',
              name: 'p_index',
              component: p_index,
            },
          ],
        },
      ],
    }
  ]
})
