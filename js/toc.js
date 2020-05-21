function getHeaders(tagNames, ignore) {
  let tags = tagNames.split(",");
  return $(tagNames.toString()).filter("[id]").not(ignore).map(function() {
    return {
      level: tags.indexOf($(this).prop("tagName")),
      link: "#" + $(this).attr("id"),
      text: $(this).text()
    };
  });
}

function nestHeaders(headers) {
  let base = [];
  let buffer = {level: 0, list: base, prev: undefined};
  headers.each(function(_, header) {
    if(header.level >= 0) {
      while(header.level > buffer.level) {
        let newBuffer = {level: buffer.level + 1, list: [], prev: buffer};
        buffer = newBuffer;
      }

      while(header.level < buffer.level) {
        buffer.prev.list.push(buffer.list);
        buffer = buffer.prev;
      }

      buffer.list.push(header);
    }
  });

  while(buffer.prev != undefined) {
    buffer.prev.list.push(buffer.list);
    buffer = buffer.prev;
  }

  return base;
}

function genToc(base, nestedHeaders,level) {
  nestedHeaders.forEach(function(elem) {
    if(elem instanceof Array) {
      let ul = $("<ul/>");
      genToc(ul, elem,level+1);
      base.append(ul);
    } else {
      base.append($("<li/>").append($("<a/>", {
        href: elem.link,
        text: elem.text,
        id: "toc"+level+""
      })));
    }
  });
}

function toc(base, tagNames, ignore) {
  genToc(base, nestHeaders(getHeaders(tagNames, ignore)),0);
  //scrollToc(nestHeaders(getHeaders(tagNames, ignore)));
}
