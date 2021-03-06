import { deliverOrder, getOrder, getPaypalClientId, payOrder } from '../api';
import { getUserInfo } from '../localStorage';
import {hideLoading, parseRequestUrl, rerender, showLoading, showMessage} from '../utils';

const handlePayment = (clientId, totalPrice) => {
    window.paypal.Button.render({
        env:'sandbox',
        client: {
            sandbox: clientId,
            production: '',
        },
        locale: 'en_US',
        style: {    
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        },
        commit: true,
        payment(data, actions){
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total: totalPrice,
                            currency: 'USD'
                        },
                    },
                ],
            });
        },
        onAuthorize(data, actions) {
            return actions.payment.execute().then(async() => {
                showLoading();
                await payOrder(parseRequestUrl().id, {
                orderID: data.orderID, 
                payerID: data.payerID,
                paymentID: data.paymentID,
            });
                hideLoading();
                showMessage('O pagamento foi aprovado.', () => {
                    // eslint-disable-next-line no-use-before-define
                    rerender(OrderScreen);
                });
            });
        },   
    },
    '#paypal-button'
    ).then(() => {
        hideLoading();
    });
};
const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    showLoading();
    if (!window.paypal) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.async = true;
        script.onload = () => handlePayment(clientId, totalPrice);
        document.body.appendChild(script);
    } else {
        handlePayment(clientId, totalPrice);
    }
};
const OrderScreen = {
    after_render: async () => {
        const request = parseRequestUrl();
         if (document.getElementById("deliver-order-button")) {
           document.addEventListener("click", async () => {
             showLoading();
             await deliverOrder(request.id);
             hideLoading();
             showMessage("Order Delivered.");
             rerender(OrderScreen);
           });
         }
    },
    render: async () => {
        const {isAdmin} = getUserInfo();
        const request = parseRequestUrl();
        const {
            _id,
            shipping,
            payment,
            orderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isDelivered, 
            deliveredAt,
            isPaid,
            paidAt,
        } = await getOrder(request.id);
        if (!isPaid){
            addPaypalSdk(totalPrice);
        }
        return `
        <div>
        <h1>Pedido ${_id}</h1>
            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Pedido</h2>
                        <div>
                            ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                            ${shipping.country}
                        </div>
                        <div>
                            ${
                                isDelivered ? `<div class="success">Entregue em ${deliveredAt}</div>` : `<div class="error">N??o entregue</div>`
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Pagamento</h2>
                        <div>
                            M??todo de Pagamento: ${payment.paymentMethod}
                        </div>
                        ${
                            isPaid ? `<div class="success">Pago em ${paidAt}</div>` : `<div class="error">N??o foi pago</div>`
                        }
                    </div>
                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Carrinho</h2>
                                <div>Pre??o</div>
                            </li>
                            ${
                                orderItems.map( item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}"/>
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">${item.name}</a>
                                        </div>
                                        <div>Qtd: ${item.qty}</div>
                                    </div>
                                    <div class="cart-price">$${item.price}</div>
                                </li>
                                `
                            )}
                        </ul>
                    </div>
                </div>
                <div class="order-action">
                        <ul>
                            <li>
                                <h2>Resumo do pedido</h2>
                            </li>
                            <li>
                                <li><div>Itens</div><div>$${itemsPrice}</div></li>
                                <li><div>Frete</div><div>$${shippingPrice}</div></li>
                                <li><div>Taxas</div><div>$${taxPrice}</div></li>
                                <li class="total"><div>Total</div><div>$${totalPrice}</div></li>
                                <li>
                                    <div class="fw" id="paypal-button"></div>
                                </li>
                                <li>
                                ${
                                    isPaid && !isDelivered && isAdmin ? 
                                    `<button id="deliver-order-button" class="primary fw">Entregar pedido</button>` : ''
                                }    
                                </li>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
        `;
}
};
export default OrderScreen;