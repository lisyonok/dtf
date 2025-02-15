#!/bin/bash

function delete_all_drawings() {
    echo "Удаление всех рисунков..."
    # Удаляем файлы из upload директории
    rm -rf /usr/src/app/upload/*
    # Удаляем записи из базы данных
    npx prisma query 'DELETE FROM "Drawing";'
    echo "Все рисунки успешно удалены"
}

function delete_drawing_by_hash() {
    local hash=$1
    echo "Удаление рисунка с хэшем: $hash"
    
    # Получаем пути к файлам из базы данных
    local paths=$(npx prisma query 'SELECT "pathToFullSize", "pathToThumbnail" FROM "Drawing" WHERE id = '\'''"$hash"'\''';')
    
    if [ -n "$paths" ]; then
        # Удаляем физические файлы
        while IFS='|' read -r fullsize thumbnail; do
            [ -f "/usr/src/app/upload/$fullsize" ] && rm "/usr/src/app/upload/$fullsize"
            [ -f "/usr/src/app/upload/$thumbnail" ] && rm "/usr/src/app/upload/$thumbnail"
        done <<< "$paths"
        
        # Удаляем запись из базы данных
        npx prisma query 'DELETE FROM "Drawing" WHERE id = '\'''"$hash"'\''';'
        echo "Рисунок успешно удален"
    else
        echo "Рисунок с указанным хэшем не найден"
    fi
}

# Проверка аргументов
if [ "$1" == "--all" ]; then
    delete_all_drawings
elif [ "$1" == "--hash" ] && [ -n "$2" ]; then
    delete_drawing_by_hash "$2"
else
    echo "Использование:"
    echo "  $0 --all              # Удалить все рисунки"
    echo "  $0 --hash <hash>      # Удалить рисунок по хэшу"
fi 