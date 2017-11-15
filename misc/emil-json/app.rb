require 'sinatra'
require 'json'

get('/') do
    erb :index
end

get('/givemedata') do
    arr = ["I", "am", "an", "array"]
    dict = {this:"is", a:"dict"}
    data = {arr:arr, dict:dict}
    return data.to_json
end