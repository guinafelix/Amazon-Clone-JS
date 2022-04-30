const CheckoutSteps = {
    render: (props) => `
        <div class="checkout-steps">
            <div class="${props.step1 ? 'active' : ''}">Login</div>
            <div class="${props.step2 ? 'active' : ''}">Entrega</div>
            <div class="${props.step3 ? 'active' : ''}">Pagamento</div>
            <div class="${props.step4 ? 'active' : ''}">Fazer pedido</div>
        </div>
        `
};
export default CheckoutSteps;
