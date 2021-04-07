import Layout from '@/layout';
const tableRouter = {
    path: '/table',
    component: Layout,
    redirect: '/table/dynamic',
    name: 'table',
    meta: { title: '表格', icon: 'table' },
    children: [
        {
            path: 'dynamic',
            component: () => import('@/views/table/index'),
            name: 'dynamicTable',
            meta: { title: '传统表格' }
        },
        {
            path: 'checkboxTable',
            component: () => import('@/views/table/checkboxTable'),
            name: 'checkboxTable',
            meta: { title: '多选框表格' }
        }
    ]
}
export default tableRouter;