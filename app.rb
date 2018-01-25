class App < Sinatra::Base

# require 'sinatra'
# require 'sqlite3'
# require 'json'
# require 'byebug'

#FRÅGOR: erb skickas ejj!

get('/') do
    
    db = SQLite3::Database.new('./db/fast_forward_db.sqlite')
    result = db.execute("SELECT * FROM courses")
    collections_first_course = db.execute("SELECT * FROM collections")
    #result = result[0..-1]
    #Vi vill skicka två vars, en med alla kurnamn och en med info om collections  (namn + course_id)?
    print "REULT::"
    p result
    tomt = []
    erb(:index, locals:{kurser:result, comments:tomt, collections:collections_first_course})
end

#Hämta alla kommentarer från colllection

get('/comments/?') do
    #To build options in select
    db = SQLite3::Database.new('./db/fast_forward_db.sqlite')
    result1 = db.execute("SELECT * FROM courses")
    p result1
    #To build buttons
    collection_id = params["collection-select"]
    db = SQLite3::Database.new('./db/fast_forward_db.sqlite')
    result2 = db.execute("SELECT text,color FROM comments WHERE collection_id IN (SELECT id FROM collections WHERE id = ?)",collection_id)
    print "RESULT::"
    p result2
    #collections = []
    
    erb(:index, locals:{comments:result2, kurser:result1})
end

#Hämta (via ajax), collections tillhörande courses
get('/collections/:courseid') do
    course_id = params[:courseid]
    db = SQLite3::Database.new('./db/fast_forward_db.sqlite')
    array = db.execute("SELECT id,collection_name FROM collections WHERE course_id = ?",course_id)
    object = {object_first_key:array}
   # object2 = object.to_json
    #print "::OBJECT2 =" + object2
return object.to_json  
end





    post('/hello') do
        #byebug
    # 1. Skicka STRÄNG med post eller get (en lånh jävel)
    # Sträng i form av {"hello": "goodbye", "Hej" : "Hejdå"}
    # 2. Ta emot strängen som en parameter i URL. data = params[:data]
    # 3. Gör den till en hash (rubys dict-obj?) och parsa genom att
    # my_hash = JSON.parse(data)
    # puts my_hash["hello"] => "goodbye"

    #1
    #string =  '{"hello": "goodbye", "Hej" : "Hejdå"}'

    collection_testbyebug = params["collection_name"]
    p "sdfdsfdsfdsfdsfdsfsdf"
    p collection_testbyebug


    #byebug
        
    #Debug: What if collection_name copy
    
    db = SQLite3::Database.new('./db/fast_forward_db.sqlite')
        
        collection_name = params["collection_name"] #Tänk på att ha unikt collection_name!
        course_id = params["course_id"].to_i

    db.execute("INSERT INTO collections (collection_name, course_id) VALUES (?,?)",collection_name,course_id)
    #Hämta id för nyligen tillagda collection här (blir "collection_id" nedan)
    collection_id = db.execute("SELECT id FROM collections WHERE collection_name = ?",collection_name)

        comments = params["comments"] #Tänk på att ha unikt collection_name!

    i = 0

    while i < comments.length do
            db.execute("INSERT INTO comments (text, color, collection_id) VALUES (?,?,?)",comments["#{i}"][0],comments["#{i}"][1],collection_id)
            i += 1
    end
    
    end

end

    


