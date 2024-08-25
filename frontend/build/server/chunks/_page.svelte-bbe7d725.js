import { c as create_ssr_component, b as subscribe, h as add_attribute, f as each, v as validate_component, e as escape, i as createEventDispatcher } from './ssr-69d45533.js';
import 'qr-scanner';
import { Q as PathExitQr } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import { p as page } from './stores-fc2c2f25.js';
import 'html5-qrcode';
import { b as beforeNavigate } from './navigation-766853ab.js';
import './utils-5d589345.js';
import './index-64aa7a5e.js';

const QrOperation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { index } = $$props;
  let { operation } = $$props;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.operation === void 0 && $$bindings.operation && operation !== void 0)
    $$bindings.operation(operation);
  return `<div class="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12"><div class="card p-3 py-2" role="button"><div class="row g-0"><div class="card-body text-center">${operation?.status == "loading" ? `<div class="row align-items-center justify-content-center" data-svelte-h="svelte-uu6jvq"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>` : `${operation?.status == "error" ? `<i class="ri-error-warning-line text-danger fs-1 align-middle"></i> <audio src="/assets/audio/fail.mp3"></audio> ${!JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit.simplified") ? `${operation?.errors?.json ? `<p class="text-danger">${escape(operation.errors.json[0])}</p>` : ``} ${operation?.errors?.student_id ? `<p class="text-danger">${escape(operation.errors.student_id[0])}</p>` : ``} ${operation?.errors?.queue_student_id ? `<p class="text-danger">${escape(operation.errors.queue_student_id[0])}</p>` : ``} ${operation?.errors?.queue_id ? `<p class="text-danger">${escape(operation.errors.queue_id[0])}</p>` : ``}` : ``}` : `${operation?.status == "success" ? `<audio src="/assets/audio/success.wav"></audio> <i class="ri-check-double-line text-success fs-1 align-middle"></i>` : ``}`}`}</div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let camerasList = [];
  let boxSize = 250;
  let fps = 24;
  let qrOutput = "";
  let timeout = false;
  let operations = [];
  async function exitQueue(result) {
    if (timeout)
      return;
    timeout = true;
    setTimeout(
      async () => {
        timeout = false;
      },
      // await qrScanner.start()
      1200
    );
    let newIndex = operations.push({ status: "loading" });
    operations = operations;
    let formData = new FormData();
    formData.set("student_id", result);
    let res = await fetch(PathExitQr($page.params.canteenId), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      },
      method: "POST",
      body: formData
    });
    redirector(res);
    res = await res.json();
    if (res.status == "success") {
      operations[newIndex - 1] = { status: "success" };
    } else {
      res.errors;
      operations[newIndex - 1] = { status: "error", errors: res.errors };
    }
  }
  function listenInput(event) {
    let key = event.key;
    if (key === "\n" || key === "\r" || key == "Enter") {
      exitQueue(qrOutput);
      qrOutput = "";
    } else {
      qrOutput += key;
    }
  }
  beforeNavigate(() => {
    document.removeEventListener("keydown", globalThis.listenInput);
  });
  document.addEventListener("keydown", listenInput);
  $$unsubscribe_page();
  return `${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit") ? `<div class="row"><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex flex-wrap"><h4 class="card-title mb-2 flex-grow-1">Queue QR exit 
                        ${`<span class="badge bg-secondary" data-svelte-h="svelte-1wrxaq2">Using the External Scanner</span>`}</h4> <div class="flex-shrink-0">   <button type="button" data-bs-toggle="modal" data-bs-target="#QrSettings" class="btn btn-light btn-icon waves-effect me-2" data-svelte-h="svelte-1m3cmxo"><i class="ri-settings-4-line fs-4"></i></button> ${`<button type="button" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1rledf1">Launch Qr Scanner</button>`} </div> </div> ${`<input type="text" name="firstname" class="form-control" id="firstName"${add_attribute("value", qrOutput, 0)}>`} ${``} </div></div>   <div class="row mt-4">${each(operations, (operation, index) => {
    return `${validate_component(QrOperation, "QrOperation").$$render($$result, { index, operation }, {}, {})}`;
  })}</div> <div id="stream" data-svelte-h="svelte-sfcnck"></div>  </div>` : ``} <div class="modal fade" id="QrSettings" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-15a0b33"><h5 class="modal-title" id="exampleModalgridLabel">Qr Settings</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body"><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-1gety4r">Box Size</label> <input type="number" class="form-control" name="name" id="firstName"${add_attribute("value", boxSize, 0)}></div> <div><label for="name" class="form-label" data-svelte-h="svelte-12m03yi">Fps</label> <input type="number" class="form-control" name="name" id="firstName"${add_attribute("value", fps, 0)}></div> <label for="class" class="form-label" data-svelte-h="svelte-1oi8tet">Camera</label> <select class="form-select" name="class" id="class" aria-label="Default select example">${each(camerasList, (camera) => {
    return `<option${add_attribute("value", camera, 0)}>${escape(camera.label)}</option>`;
  })}</select> <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-zmnord"><input type="submit" class="btn btn-primary waves-effect waves-light" data-bs-dismiss="modal" value="Apply"></div> </div></div></div></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-bbe7d725.js.map
