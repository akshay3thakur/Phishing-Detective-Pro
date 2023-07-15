var testdata;
var prediction;

function predict(data, weight) {
  var f = 0;
  weight = [
    3.33346292e-01,
    -1.11200396e-01,
    -7.77821806e-01,
    1.11058590e-01,
    3.89430647e-01,
    1.99992062e+00,
    4.44366975e-01,
    -2.77951957e-01,
    -6.00531647e-05,
    3.33200243e-01,
    2.66644002e+00,
    6.66735991e-01,
    5.55496098e-01,
    5.57022408e-02,
    2.22225591e-01,
    -1.66678858e-01,
  ];

  for (var j = 0; j < data.length; j++) {
    f += data[j] * weight[j];
  }

  return f > 0 ? 1 : -1;
}

function isIPInURL() {
  var reg = /\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}[\.]{1}\d{1,3}/;
  var url = window.location.href;

  if (reg.exec(url) == null) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isLongURL() {
  var url = window.location.href;

  if (url.length < 54) {
    console.log("NP");
    return -1;
  } else if (url.length >= 54 && url.length <= 75) {
    console.log("Maybe");
    return 0;
  } else {
    console.log("P");
    return 1;
  }
}

function isTinyURL() {
  var url = window.location.href;

  if (url.length > 20) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isAlphaNumericURL() {
  var search = "@";
  var url = window.location.href;

  if (url.match(search) == null) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isRedirectingURL() {
  var reg1 = /^http:/;
  var reg2 = /^https:/;
  var srch = "//";
  var url = window.location.href;

  if (
    url.search(srch) == 5 &&
    reg1.exec(url) != null &&
    url.substring(7).match(srch) == null
  ) {
    console.log("NP");
    return -1;
  } else if (
    url.search(srch) == 6 &&
    reg2.exec(url) != null &&
    url.substring(8).match(srch) == null
  ) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isHypenURL() {
  var reg = /[a-zA-Z]\//;
  var srch = "-";
  var url = window.location.href;

  if (url.substring(0, url.search(reg) + 1).match(srch) == null) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isMultiDomainURL() {
  var reg = /[a-zA-Z]\//;
  var srch = "-";
  var url = window.location.href;

  if (url.substring(0, url.search(reg) + 1).split('.').length < 5) {
    console.log("NP");
    return -1;
  } else {
    console.log("P");
    return 1;
  }
}

function isFaviconDomainUnidentical() {
  var reg = /[a-zA-Z]\//;
  var url = window.location.href;

  if (document.querySelectorAll("link[rel*='shortcut icon']").length > 0) {
    var faviconurl = document.querySelectorAll("link[rel*='shortcut icon']")[0].href;

    if (
      url.substring(0, url.search(reg) + 1) ==
      faviconurl.substring(0, faviconurl.search(reg) + 1)
    ) {
      function isIllegalHttpsURL() {
        var url = window.location.href;
        var srch1 = "//";
        var srch2 = "https";

        if (url.substring(url.search(srch1)).match(srch2) == null) {
          console.log("NP");
          return -1;
        } else {
          console.log("P");
          return 1;
        }
      }

      function isImgFromDifferentDomain() {
        console.log("NP");
        return -1;
      }

      console.log("P");
      return 1;
    } else {
      console.log("NP");
      return -1;
    }
  }

  var srch2 = "https";
  var srch1 = "//";
}

function getIdenticalDomainCount(tagName) {
  var domain = window.location.host;
  var elements = document.querySelectorAll(tagName);
  var count = 0;

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.src && element.src.indexOf(domain) >= 0) {
      count++;
    }
  }

  return count;
}

function isAnchorFromDifferentDomain() {
  var totalCount = document.querySelectorAll("a").length;
  var identicalCount = getIdenticalDomainCount("a");

  if (identicalCount / totalCount < 0.31) {
    console.log("NP");
    return -1;
  } else if (identicalCount / totalCount >= 0.31 && identicalCount / totalCount <= 0.67) {
    console.log("Maybe");
    return 0;
  } else {
    console.log("P");
    return 1;
  }
}

function isScLnkFromDifferentDomain() {
  var totalCount =
    document.querySelectorAll("script").length +
    document.querySelectorAll("link").length;
  var identicalCount =
    getIdenticalDomainCount("script") + getIdenticalDomainCount("link");

  if (identicalCount / totalCount < 0.17) {
    console.log("NP");
    return -1;
  } else if (identicalCount / totalCount >= 0.17 && identicalCount / totalCount <= 0.81) {
    console.log("Maybe");
    return 0;
  } else {
    console.log("P");
    return 1;
  }
}

function isFormActionInvalid() {
  var totalCount = document.querySelectorAll("form").length;
  var identicalCount = getIdenticalDomainCount("form");

  if (identicalCount / totalCount < 0.15) {
    console.log("NP");
    return -1;
  } else if (identicalCount / totalCount >= 0.15 && identicalCount / totalCount <= 0.61) {
    console.log("Maybe");
    return 0;
  } else {
    console.log("P");
    return 1;
  }
}

function isSubmittingToEmail() {
  var totalCount = document.querySelectorAll("form").length;
  var emailCount = 0;
  var forms = document.querySelectorAll("form");

  for (var i = 0; i < forms.length; i++) {
    var form = forms[i];
    var action = form.getAttribute("action");

    if (action && action.toLowerCase().startsWith("mailto:")) {
      emailCount++;
    }
  }

  if (emailCount / totalCount > 0) {
    console.log("P");
    return 1;
  } else {
    console.log("NP");
    return -1;
  }
}

function isAbnormalURL() {
  var abnormalCount = 0;
  var totalCount = document.querySelectorAll("*").length;
  var aTags = document.querySelectorAll("a");

  for (var i = 0; i < aTags.length; i++) {
    var aTag = aTags[i];
    var href = aTag.getAttribute("href");

    if (href && href.trim() !== "" && !href.startsWith("#")) {
      abnormalCount++;
    }
  }

  if (abnormalCount / totalCount > 0.22) {
    console.log("P");
    return 1;
  } else {
    console.log("NP");
    return -1;
  }
}

function analyzePage() {
  var features = [];
  features.push(isIPInURL());
  features.push(isLongURL());
  features.push(isTinyURL());
  features.push(isAlphaNumericURL());
  features.push(isRedirectingURL());
  features.push(isHypenURL());
  features.push(isMultiDomainURL());
  features.push(isFaviconDomainUnidentical());
  features.push(isIllegalHttpsURL());
  features.push(isImgFromDifferentDomain());
  features.push(isAnchorFromDifferentDomain());
  features.push(isScLnkFromDifferentDomain());
  features.push(isFormActionInvalid());
  features.push(isSubmittingToEmail());
  features.push(isAbnormalURL());

  prediction = predict(features);

  if (prediction == -1) {
    console.log("The website is likely not a phishing website.");
  } else {
    console.log("The website is likely a phishing website.");
  }
}

analyzePage();
