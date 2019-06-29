var serializer = function(raw, selections){
  let serialized = {};
  for (let key of selections){
    if (key.constructor === String){
      serialized[key] = raw[key];
    } else {
      serialized[key.name] = raw[key.key].map((info) => serializer(info, key.sub_keys));
    }
  }
  return serialized;
}

module.exports = serializer
