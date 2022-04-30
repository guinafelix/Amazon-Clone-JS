
const DashboardMenu = {
    render: (props) => `
        <div class="dashboard-menu">
            <ul>
                <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
                    <a href="/#/dashboard">Dashboard</a>
                </li>
                <li class="${props.orders === 'dashboard' ? 'selected' : ''}">
                    <a href="/#/orderlist">Pedidos</a>
                </li>
                <li class="${props.products === 'dashboard' ? 'selected' : ''}">
                    <a href="/#/productlist">Produtos</a>
                </li>
            </ul>
        </div>
        `,
};
export default DashboardMenu;