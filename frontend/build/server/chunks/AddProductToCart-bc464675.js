import { c as create_ssr_component, i as createEventDispatcher, v as validate_component, f as each, e as escape, h as add_attribute } from './ssr-69d45533.js';
import { P as Product } from './Product-402ba5c0.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import './index-64aa7a5e.js';

const AddProductToCart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let close;
  let productsList = [];
  let productsPagination;
  return `<div class="modal fade" id="addProductToCartModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1dtnbpj"><h5 class="modal-title" id="exampleModalgridLabel">Add Product</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "product" }, {}, {})} <div class="row pe-0 mb-3"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-h275bz"><tr class="bg-secondary-subtle"><th scope="col">ID</th> <th scope="col">Product</th> <th scope="col">Price</th> <th scope="col">Action</th></tr></thead> <tbody class="list">${each(productsList, (product) => {
    return `<tr><td>${escape(product.id)}</td> <td>${validate_component(Product, "Product").$$render(
      $$result,
      {
        src: product.image.full_path,
        name: product.name,
        category: product?.category?.name
      },
      {},
      {}
    )}</td> <td>${product.sale_price ? `<span class="fs-6 text-decoration-line-through text-danger">${escape(product.price)}</span> <span class="fs-5">${escape(product.sale_price)}</span>` : `<span class="fs-5">${escape(product.price)}</span>`}</td> <td><div class="hstack gap-3 flex-wrap"><button type="button" class="btn btn-primary" data-bs-dismiss="modal" data-svelte-h="svelte-kiiehc">Select</button> </div></td> </tr>`;
  })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, productsPagination), {}, {})} <div class="row g-3"><div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button></div></div> </div></div></div></div>`;
});

export { AddProductToCart as A };
//# sourceMappingURL=AddProductToCart-bc464675.js.map
