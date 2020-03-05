const express = require('express');
const models = require('../../models');
const router = express.Router();
const SUCCESS = 1;

router.post('',(request, response) => {
    if(request.body.tags != undefined){
        request.body.tags = request.body.tags.join();
    }

    let data = request.body;
    models.TodoList.create(data)
        .then(result =>{
            if(result.dataValues.tags != undefined){
                result.dataValues.tags = result.dataValues.tags.split(",");
            }
            return response.json(result.dataValues);
        }).catch(err=>{
        console.log(err);
        return response.status(500).send('');
    });
});

router.get('',(request, response) => {
    models.TodoList.findAll({raw: true}).then(result => {
        tag(result);
        return response.json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).send('');
    });

});

router.get('/:id',(request, response) => {
    let id = request.params.id;
    models.TodoList.findOne({where:{id:id}})
                   .then(result => {
                       if(result == SUCCESS){
                           return response.json(result.dataValues);
                       }else{
                           return response.status(400).send({msg:"유효하지 않은 ID."});
                       }

                }).catch(err=>{
                    console.log(err);
                    return response.status(400).send({msg:"유효하지 않은 ID."});
                });

});



router.put('/:id/complete',(request, response) => {
    let id = request.params.id;
    models.TodoList
          .update({isCompleted:true},{where:{id:id}}).then(result => {
              return models.TodoList.findOne({where:{id:result}});
          }).then(result => {
            return response.json(result.dataValues);
          }).catch(err=>{
                console.log(err);
                return response.status(500).send('');
          });
});

router.put('/:id',(request, response) => {
    let id = request.params.id;
    if(request.body.tags != undefined){
        request.body.tags = request.body.tags.join();
    }
    let data = request.body;
    models.TodoList
        .update(data,{where:{id:id}}).then(result => {
            if(result == 1){
                return models.TodoList.findOne({where:{id:id}});
            }else{
                return response.status(400).send({msg:"유효하지 않은 ID."});
            }
    }).then(result => {
        return response.json(result.dataValues);
    }).catch(err=>{
        console.log(err);
        return response.status(500).send('');
    });

});

router.delete('/:id',(request, response) => {
    let id = request.params.id;
    models.TodoList
          .destroy({where:{id:id}}).then(result => {
              let msg = "fail" ;
              if(result == 1){
                msg = "success";
              }
             return response.json({msg:msg});
       }).catch(err=>{
        console.log(err);
        return response.status(500).send('');
    });
});




function tag(result){
    result.forEach(data =>{
        if(data.tags != null){
            data.tags = data.tags.split(",");
        }
    });
}

module.exports = router;

