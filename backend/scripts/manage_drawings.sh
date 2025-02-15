#!/bin/sh

delete_all_drawings() {
    echo "Удаление всех рисунков..."
    # Удаляем файлы из upload директории
    rm -rf /usr/src/app/upload/*
    # Удаляем записи из базы данных
    npx prisma db execute --stdin < echo "DELETE FROM \"Drawing\";"
    echo "Все рисунки успешно удалены"
}

delete_drawing_by_hash() {
    hash=$1
    echo "Удаление рисунка с хэшем: $hash"
    
    # Получаем пути к файлам из базы данных
    paths=$(npx prisma db execute --stdin < echo "SELECT \"pathToFullSize\", \"pathToThumbnail\" FROM \"Drawing\" WHERE id = '$hash';")
    
    if [ -n "$paths" ]; then
        # Используем echo и cut вместо while read для sh
        fullsize=$(echo "$paths" | cut -d'|' -f1)
        thumbnail=$(echo "$paths" | cut -d'|' -f2)
        
        # Удаляем физические файлы если они существуют
        [ -f "/usr/src/app/upload/$fullsize" ] && rm "/usr/src/app/upload/$fullsize"
        [ -f "/usr/src/app/upload/$thumbnail" ] && rm "/usr/src/app/upload/$thumbnail"
        
        # Удаляем запись из базы данных
        npx prisma db execute --stdin < echo "DELETE FROM \"Drawing\" WHERE id = '$hash';"
        echo "Рисунок успешно удален"
    else
        echo "Рисунок с указанным хэшем не найден"
    fi
}

# Проверка аргументов
case "$1" in
    --all)
        delete_all_drawings
        ;;
    --hash)
        if [ -n "$2" ]; then
            delete_drawing_by_hash "$2"
        else
            echo "Требуется указать хэш рисунка"
        fi
        ;;
    *)
        echo "Использование:"
        echo "  $0 --all              # Удалить все рисунки"
        echo "  $0 --hash <hash>      # Удалить рисунок по хэшу"
        ;;
esac 