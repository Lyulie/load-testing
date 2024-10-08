package models

import "encoding/json"

type Item struct {
    ID   uint   `gorm:"primaryKey" json:"id"`
    Name string `json:"name"`
}

func (i Item) String() string {
	jsonData, err := json.Marshal(i)
	if err != nil {
		return ""
	}
	return string(jsonData)
}