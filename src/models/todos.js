'use strict';
module.exports = function (sequelize, DataType) {
    var todo = sequelize.define('TodoList',{
        id : {
            type : DataType.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataType.STRING,
        },
        description : {
            type : DataType.STRING,
        },
        isCompleted : {
            type : DataType.BOOLEAN,
            default : false
        },
        tags : {
            type: DataType.STRING,
            allowNull : true
        }
    });

    return todo;
};
