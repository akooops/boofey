import { g as goto } from './navigation-766853ab.js';
import { l as PathRefresh, m as PathAuth } from './paths-53224d1e.js';
import { e as error } from './index-64aa7a5e.js';

async function redirector(res) {
  if (!res.ok) {
    if (res.status == 403) {
      goto("/verification");
    } else if (res.status == 401) {
      goto("/signin");
    } else if (res.status == 404 || res.status == 500) {
      throw error(res.status);
    }
  }
}
async function refresher() {
  let formData = new FormData();
  formData.append("token", localStorage.getItem("SID"));
  let res = await (await fetch(PathRefresh(), {
    method: "POST",
    body: formData
  })).json();
  if (res.status == "success") {
    localStorage.setItem("SID", `${res.token}`);
  }
}
async function ProfileData() {
  let authRes = await fetch(PathAuth(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  if (authRes.ok) {
    let authResponse = await authRes.json();
    if (authResponse?.data?.user?.verified == false) {
      goto("/verification");
      return;
    }
    if (authResponse?.data?.user?.roles[0]?.name == "parent" && window.location.href.includes("admin")) {
      goto("/", { replaceState: true });
      return;
    }
    return authResponse;
  } else {
    goto("/signin");
  }
  return {};
}

export { ProfileData as P, redirector as a, refresher as r };
//# sourceMappingURL=auth-d76f3c60.js.map
